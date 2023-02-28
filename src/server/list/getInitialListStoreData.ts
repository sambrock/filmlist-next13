import type { Prisma } from '@prisma/client';

import { prisma } from '../prisma';
import { MAX_LIST_MOVIES } from '@/utils/constants';

export type InitialListStoreData = Prisma.ListGetPayload<{
  where: { id: number };
  include: { movies: { include: { movie: true } } };
}>;

export const getInitialListStoreData = async (listId: string) => {
  const initialData = await prisma.list.findUnique({
    where: { id: listId },
    include: {
      movies: {
        take: MAX_LIST_MOVIES,
        orderBy: { order: 'asc' },
        include: {
          movie: true,
        },
      },
    },
  });

  const listCount = await prisma.listMovies.count({
    where: { listId },
  });

  return { initialData, listCount };
};
