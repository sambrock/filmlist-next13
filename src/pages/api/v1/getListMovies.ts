import { z } from 'zod';
import type { Prisma } from '@prisma/client';

import { handler } from '@/server/handler';
import { prisma } from '@/server/prisma';
import { MAX_LIST_MOVIES } from '@/constants';
import type { Api } from '@/api/api.types';
import { awaitTimeout } from '@/utils';

export type ListMoviesWithMovie = Prisma.ListMoviesGetPayload<{
  where: { listId: number };
  include: { movie: true };
}>;

export type GET_GetListMovies = Api.GetRoute<{
  url: '/api/v1/getListMovies';
  params: z.input<typeof queryParamsSchema>;
  data: Awaited<ReturnType<typeof getListMovies>>;
}>;

const queryParamsSchema = z.object({
  listId: z.string().default(''),
  page: z
    .string()
    .default('1')
    .transform((v) => +v),
});

export const getListMovies = async (listId: string, page: number) => {
  return await prisma.listMovies.findMany({
    where: { listId },
    include: { movie: true },
    orderBy: { order: 'asc' },
    take: MAX_LIST_MOVIES,
    skip: (page - 1) * MAX_LIST_MOVIES,
  });
};

export default handler({
  async get(req, res) {
    const parsedQueryParams = queryParamsSchema.safeParse(req.query);
    if (!parsedQueryParams.success) return res.send([]);

    const data = await getListMovies(parsedQueryParams.data.listId, parsedQueryParams.data.page);

    return res.send(data);
  },
});
