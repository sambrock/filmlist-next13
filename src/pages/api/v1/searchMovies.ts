import { z } from 'zod';
import type { Movie } from '@prisma/client';

import { TMDbApi } from '@/services/tmdb';
import { handler } from '@/server/handler';
import { MAX_SEARCH_RESULTS } from '@/utils/constants';
import { GetApiDefinition } from '@/api/api.types';

export type GET_SearchMovie = GetApiDefinition<{
  url: '/api/v1/searchMovies';
  params: z.input<typeof searchQueryParamsSchema>;
  return: Awaited<ReturnType<typeof getSearchMovies>>;
}>;

const searchQueryParamsSchema = z.object({
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

  const parsed = movies
    .filter((m) => {
      if (!m.poster_path || m.adult) return false;
      if (m.popularity < 2) return false;
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
    })) satisfies Movie[];

  return parsed.slice(0, MAX_SEARCH_RESULTS);
};

export default handler({
  async get(req, res) {
    const parsedParams = searchQueryParamsSchema.safeParse(req.query);
    if (!parsedParams.success) return res.send([]);

    const data = await getSearchMovies(parsedParams.data.q);

    return res.send(data);
  },
});
