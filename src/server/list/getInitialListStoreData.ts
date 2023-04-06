import type { Prisma } from '@prisma/client';

import { prisma } from '../prisma';
import { MAX_LIST_MOVIES } from '@/constants';

export type InitialListStoreData = Prisma.ListGetPayload<{
  where: { id: number };
  include: { movies: { include: { movie: true } } };
}>;

export const getInitialListStoreData = async (listId: string) => {
  const [initialData, listCount, listMovieIds] = await Promise.all([
    await prisma.list.findUnique({
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
    }),

    await prisma.listMovies.count({
      where: { listId },
    }),

    await prisma.listMovies.findMany({
      where: { listId },
      select: { movieId: true },
      orderBy: { order: 'asc' },
    }),
  ]);

  return { initialData, listCount, listMovieIds: listMovieIds.map((movie) => movie.movieId) };
};
