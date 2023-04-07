import { z } from 'zod';

import { handler } from '@/server/handler';
import type { Api } from '@/api/api.types';
import { TMDbApi, TMDbPersonMovieCreditsResponse } from '@/services/tmdb';

export type GET_GetMovieDetails = Api.GetRoute<{
  url: '/api/v1/getMovieDetails';
  params: z.input<typeof queryParamsSchema>;
  data: Awaited<ReturnType<typeof getMovieDetails>>;
}>;

export const getMovieDetails = async (movieId: number) => {
  const [details, watchProviders] = await Promise.all([
    TMDbApi.getMovieById(movieId),
    TMDbApi.getMovieWatchProviders(movieId),
  ]);

  const filteredCrew = () => {
    const crew = details.credits.crew
      .filter((c) => {
        if (c.job.toLowerCase() === 'director') return true;
        if (c.job.toLowerCase() === 'screenplay') return true;
        if (c.job.toLowerCase() === 'writer') return true;
        return false;
      })
      .sort((a, b) => {
        if (a.job.toLowerCase() === 'director') return -1;
        if (b.job.toLowerCase() === 'director') return 1;
        return 0;
      });
    return [...new Set(crew.map((c) => c.name))].map((name) => {
      const info = crew.find((c) => c.name === name);
      const jobs = crew
        .filter((c) => c.name === name)
        .map((c) => c.job)
        .join(', ');

      return {
        ...info,
        job: jobs,
      } as TMDbPersonMovieCreditsResponse['crew'][number];
    });
  };

  const filteredMovieDetails = {
    ...details,
    credits: {
      ...details.credits,
      crew: filteredCrew(),
      cast: details.credits.cast.filter((c) => {
        if (c.character === '') return false;
        if (c.character.toLowerCase().includes('uncredited')) return false;
        return true;
      }),
    },
  };

  const filteredWatchProviders = watchProviders?.flatrate?.filter((s) => {
    if (s.provider_name.toLowerCase().includes('channel')) return false;
    if (s.provider_name.toLowerCase().includes('netflix ')) return false;
    return true;
  });

  return { ...filteredMovieDetails, watchProviders: filteredWatchProviders || [] };
};

const queryParamsSchema = z.object({
  movieId: z
    .string()
    .default('')
    .transform((v) => +v),
});

export default handler({
  async get(req, res) {
    const parsedQueryParams = queryParamsSchema.safeParse(req.query);
    if (!parsedQueryParams.success) return res.send([]);

    const data = await getMovieDetails(parsedQueryParams.data.movieId);

    return res.send(data);
  },
});
