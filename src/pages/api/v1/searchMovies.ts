import { z } from 'zod';
import type { Movie } from '@prisma/client';

import { TMDbApi, type TMDbMovieResponse } from '@/services/tmdb';
import { handler } from '@/server/handler';
import type { GetApiDefinition } from '@/api/api.types';
import { parseSearchQuery } from '@/utils';
import { MAX_SEARCH_RESULTS } from '@/utils/constants';

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

export const getSearchMovies = async (query: string, page: number) => {
  const parsedQuery = parseSearchQuery(query);

  const start = (page - 1) * MAX_SEARCH_RESULTS;
  const end = start + MAX_SEARCH_RESULTS;

  let full: TMDbMovieResponse[] = [];

  if (parsedQuery.director) {
    const director = await TMDbApi.getSearchPeople({ query: parsedQuery.director });
    if (director.length > 0) {
      const movies = await TMDbApi.getPersonMovieCredits(director[0].id);
      full = await Promise.all(
        movies.crew
          .filter((m) => {
            if (m.job !== 'Director' && m.job !== 'Directing') return false;
            if (parsedQuery.year) {
              const releaseYear = new Date(m.release_date).getFullYear();
              if (releaseYear !== +parsedQuery.year) return false;
            }
            if (parsedQuery.query) {
              if (!m.title.toLowerCase().includes(parsedQuery.query.toLowerCase())) return false;
            }
            return true;
          })
          .slice(start, end)
          .map((m) => TMDbApi.getMovieById(m.id))
      );
    }
  } else {
    const movies = await TMDbApi.getSearchMovies({
      query: parsedQuery.query,
      year: parsedQuery.year,
    });

    full = await Promise.all(movies.slice(start, end).map((m) => TMDbApi.getMovieById(m.id)));
  }

  console.log(full, 'full');

  const parsed = full
    .filter((m) => {
      if (!m.poster_path || m.adult) return false;
      if (m.popularity < 1) return false;
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
          .filter((c) => c.job === 'Director' || c.job === 'Directing')
          .map((c) => c.name)
          .join(', ') || '',
    }))
    .filter((m) => {
      if (m.director === '') return false;
      return true;
    }) satisfies (Movie & { director: string })[];

  return parsed;
};

export default handler({
  async get(req, res) {
    const parsedQueryParams = queryParamsSchema.safeParse(req.query);
    if (!parsedQueryParams.success) return res.send([]);

    const data = await getSearchMovies(parsedQueryParams.data.q, parsedQueryParams.data.page);

    return res.send(data);
  },
});
