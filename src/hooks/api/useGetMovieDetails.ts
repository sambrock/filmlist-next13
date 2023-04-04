import useSWRImmutable from 'swr/immutable';
import { preload } from 'swr';

import { api } from '@/api';

export const useGetMovieDetails = (movieId: number, disable?: boolean, prevMovieId?: number, nextMovieId?: number) => {
  return useSWRImmutable(
    ['movie', movieId],
    !disable ? () => api.get('/api/v1/getMovieDetails', { params: { movieId: movieId.toString() } }) : null,
    {
      onSuccess: () => {
        if (disable) return;
        if (prevMovieId) {
          preload(['movie', prevMovieId], () =>
            api.get('/api/v1/getMovieDetails', { params: { movieId: prevMovieId.toString() } })
          );
        }
        if (nextMovieId) {
          preload(['movie', nextMovieId], () =>
            api.get('/api/v1/getMovieDetails', { params: { movieId: nextMovieId.toString() } })
          );
        }
      },
    }
  );
};
