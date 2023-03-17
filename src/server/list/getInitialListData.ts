import { prisma } from '../prisma';
import { MAX_LIST_MOVIES } from '@/constants';

export const getInitialListData = async (listId: string) => {
  const [initialData, listCount] = await Promise.all([
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
  ]);

  return { initialData, listCount };
};
