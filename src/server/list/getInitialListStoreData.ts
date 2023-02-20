import type { Prisma } from '@prisma/client';

import { prisma } from '../prisma';

export type InitialListStoreData = Prisma.ListGetPayload<{
  where: { id: number };
  include: { movies: { include: { movie: true } } };
}>;

export const getInitialListStoreData = async (listId: string) => {
  const initialData = await prisma.list.findUnique({
    where: { id: listId },
    include: {
      movies: {
        include: {
          movie: true,
        },
      },
    },
  });

  return initialData;
};
