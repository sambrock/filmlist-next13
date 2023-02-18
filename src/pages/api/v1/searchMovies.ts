import { z } from 'zod';
import type { Movie } from '@prisma/client';

import { TMDbApi } from '@/services/tmdb';
import { handler } from '@/server/handler';
import { MAX_SEARCH_RESULTS } from '@/utils/constants';

export type GET_SearchMovieQueryParams = z.input<typeof searchQueryParamsSchema>;
export type GET_SearchMovieData = Awaited<ReturnType<typeof getSearchMovies>>;

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
