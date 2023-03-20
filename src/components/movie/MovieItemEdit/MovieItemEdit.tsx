import { memo } from 'react';
import { atom, createStore, Provider } from 'jotai';

import type { Movie } from '@prisma/client';
import { MovieItemStaticPoster } from '../MovieItemStatic/MovieItemStaticPoster';
import { usePreloadStaticPoster } from './hooks/usePreloadStaticPoster';

export const movieItemStore = createStore();
export const movieItemAtom = atom<Movie>({} as Movie);

type MovieItemProps = {
  movie: Movie;
  posterSrc?: 'tmdb' | 'default';
};

export const MovieItemEdit = memo(({ movie, posterSrc = 'default' }: MovieItemProps) => {
  movieItemStore.set(movieItemAtom, movie);

  const { preloadImg } = usePreloadStaticPoster(movie.posterPath);
  if (posterSrc === 'tmdb') preloadImg();

  return (
    <Provider store={movieItemStore}>
      <li className="fade-black-800-gradient-180 aspect-poster cursor-pointer overflow-clip rounded-sm">
        <MovieItemStaticPoster posterPath={movie.posterPath} posterSrc={posterSrc} title={movie.title} />
      </li>
    </Provider>
  );
});
