import type { Movie } from '@prisma/client';

import type { Transaction } from './convertToPrismaTransactions';
import { uploadMoviePoster } from '../media/uploadMedia';

export const saveTransactionMedia = async (transactions: Transaction[]) => {
  const movieTransactions = transactions.filter(
    (transaction) => transaction.path[1] === 'movies' && (transaction.op === 'add' || transaction.op === 'replace')
  );

  return await Promise.allSettled(
    movieTransactions.map(async (transaction) => {
      const { movie } = transaction.value as { movie: Movie };
      console.log('SAVE MOVIE POSTER')
      await uploadMoviePoster(movie.posterPath);
      console.log('SAVED')
    })
  );
};
