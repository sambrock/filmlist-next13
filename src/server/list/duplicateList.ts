import { prisma } from '../prisma';

export const duplicateList = async (fromListId: string, toListId: string) => {
  const data = await prisma.list.findUnique({
    where: { id: fromListId },
    include: { movies: true },
  });

  if (!data) return;

  await prisma.list.update({
    where: { id: toListId },
    data: {
      title: data.title,
      description: data.description,
      movies: {
        createMany: {
          data: data.movies.map((item) => ({
            movieId: item.movieId,
            order: item.order,
          })),
        },
      },
    },
  });
};
