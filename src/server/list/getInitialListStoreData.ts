import { prisma } from '../prisma';

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
