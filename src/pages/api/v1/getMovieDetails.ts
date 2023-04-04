import { z } from 'zod';

import { handler } from '@/server/handler';
import type { Api } from '@/api/api.types';
import { TMDbApi } from '@/services/tmdb';

export type GET_GetMovieDetails = Api.GetRoute<{
  url: '/api/v1/getMovieDetails';
  params: z.input<typeof queryParamsSchema>;
  data: Awaited<ReturnType<typeof getMovieDetails>>;
}>;

export const getMovieDetails = async (movieId: number) => {
  const details = await TMDbApi.getMovieById(movieId);
  return details;
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
