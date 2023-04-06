import useSWRImmutable from 'swr/immutable';
import { preload } from 'swr';

import { api } from '@/api';
import { MOVIE_IMAGE_URL } from '@/constants';
import { preloadImage } from '@/utils';

export const useGetMovieDetails = (movieId: number, disable?: boolean, prevMovieId?: number, nextMovieId?: number) => {

  return useSWRImmutable(
    ['movie', movieId],
    !disable ? () => api.get('/api/v1/getMovieDetails', { params: { movieId: movieId.toString() } }) : null,
    {
      onSuccess: async (data) => {
        if (disable) return;
        if (prevMovieId) {
          const movie = (await preload(['movie', prevMovieId], () =>
            api.get('/api/v1/getMovieDetails', { params: { movieId: prevMovieId.toString() } })
          )) as typeof data;

          preloadImage(MOVIE_IMAGE_URL['backdrop']['w780'] + movie.backdrop_path);
        }
        if (nextMovieId) {
          const movie = (await preload(['movie', nextMovieId], () =>
            api.get('/api/v1/getMovieDetails', { params: { movieId: nextMovieId.toString() } })
          )) as typeof data;

          preloadImage(MOVIE_IMAGE_URL['backdrop']['w780'] + movie.backdrop_path);
        }
      },
    }
  );
};
