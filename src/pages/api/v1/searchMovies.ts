import { z } from 'zod';
import type { Movie } from '@prisma/client';

import { TMDbApi } from '@/services/tmdb';
import { handler } from '@/server/handler';
import { GetApiDefinition } from '@/api/api.types';

export type GET_SearchMovie = GetApiDefinition<{
  url: '/api/v1/searchMovies';
  params: z.input<typeof queryParamsSchema>;
  return: Awaited<ReturnType<typeof getSearchMovies>>;
}>;

const queryParamsSchema = z.object({
  q: z.string().default(''),
  page: z
    .string()
    .default('1')
    .transform((v) => +v),
});

const getSearchMovies = async (query: string) => {
  const movies = await TMDbApi.getSearchMovies({
    query,
  });

  const full = await Promise.all(movies.map((m) => TMDbApi.getMovieById(m.id)));

  const parsed = full
    .slice(0, 4)
    .filter((m) => {
      if (!m.poster_path || m.adult) return false;
      if (m.popularity < 2) return false;
      if (m.adult) return false;
      return true;
    })
    .map((m) => ({
      id: m.id,
      title: m.title,
      overview: m.overview,
      originalLanguage: m.original_language,
      originalTitle: m.original_title,
      releaseDate: new Date(m.release_date),
      posterPath: m.poster_path,
      backdropPath: m.backdrop_path,
      director:
        m.credits?.crew
          .filter((c) => c.job === 'Director')
          .map((c) => c.name)
          .join(', ') || '',
    })) satisfies (Movie & { director: string })[];

  return parsed;
};

export default handler({
  async get(req, res) {
    const parsedQueryParams = queryParamsSchema.safeParse(req.query);
    if (!parsedQueryParams.success) return res.send([]);

    const data = await getSearchMovies(parsedQueryParams.data.q);

    return res.send(data);
  },
});
