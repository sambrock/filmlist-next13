import { memo } from 'react';
import { atom, createStore, Provider } from 'jotai';
import type { Movie } from '@prisma/client';
import { clsx } from 'clsx';

import { MovieItemStaticPoster } from '../MovieItemStatic/MovieItemStaticPoster';
import { usePreloadStaticPoster } from './hooks/usePreloadStaticPoster';
import { MovieItemEditDeleteButton } from './MovieItemEditDeleteButton';
import { movieItemStyles } from '../MovieItemStatic/MovieItemStatic';

export const movieItemStore = createStore();
export const movieItemAtom = atom<Movie>({} as Movie);

export const useMovieItemContext = () => {
  const movie = movieItemStore.get(movieItemAtom);
  if (!movie) throw new Error('MovieItemEdit: movieItemAtom is not set.');

  return movie;
};

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
      <li className={clsx(movieItemStyles)}>
        <MovieItemStaticPoster posterPath={movie.posterPath} posterSrc={posterSrc} title={movie.title} />
        <div className="invisible absolute top-1 right-1 group-hover:visible">
          <MovieItemEditDeleteButton />
        </div>
        {/* <div className="invisible absolute top-1 left-1 group-hover:visible">
          <MovieItemEditMoreOptions />
        </div> */}
      </li>
    </Provider>
  );
});
