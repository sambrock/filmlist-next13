import { z } from 'zod';
import type { ListMovies, Movie, Prisma } from '@prisma/client';

import { prisma } from '../prisma';

export type Transaction = z.infer<typeof transactionSchema>;

export const transactionSchema = z.object({
  op: z.enum(['add', 'remove', 'replace', 'update']),
  path: z.string().or(z.number()).array(),
  value: z.any(),
});

export const convertToPrismaTransactions = (listId: string, transactions: Transaction[]) => {
  const prismaTransactions = transactions.map((transaction) => {
    const { op, path, value } = transaction;
    const joinedPath = path.join('.').replace('data.', '');

    if (joinedPath === 'list.title') {
      return prisma.list.update({ where: { id: listId }, data: { title: value as string } });
    } else if (joinedPath === 'list.description') {
      return prisma.list.update({ where: { id: listId }, data: { description: value as string } });
    } else if (joinedPath.startsWith('movies')) {
      switch (op) {
        case 'add': {
          const data = value as ListMovies & { movie: Movie };
          return prisma.movie.upsert({
            where: { id: data.movieId },
            create: {
              ...data.movie,
              lists: {
                connectOrCreate: {
                  where: { listId_movieId: { listId, movieId: data.movieId } },
                  create: { listId, order: data.order, createdAt: data.createdAt, updatedAt: data.updatedAt },
                },
              },
            },
            update: {
              lists: {
                connectOrCreate: {
                  where: { listId_movieId: { listId, movieId: data.movieId } },
                  create: { listId, order: data.order, createdAt: data.createdAt, updatedAt: data.updatedAt },
                },
              },
            },
          });
        }
        case 'remove': {
          const movieId = +path[2];
          return prisma.listMovies.delete({
            where: { listId_movieId: { listId, movieId } },
          });
        }
        case 'replace':
        default:
          return undefined;
      }
    }

    return undefined;
  }) satisfies (Prisma.PrismaPromise<any> | undefined)[];

  return prismaTransactions.filter((transaction) => transaction !== undefined) as Prisma.PrismaPromise<any>[];
};
