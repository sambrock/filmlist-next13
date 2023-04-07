import { memo, useRef } from 'react';
import { atom, createStore, Provider, useSetAtom } from 'jotai';
import type { Movie } from '@prisma/client';
import { clsx } from 'clsx';
import { useEventListener } from 'usehooks-ts';

import { MovieItemStaticPoster } from '../MovieItemStatic/MovieItemStaticPoster';
import { usePreloadStaticPoster } from './hooks/usePreloadStaticPoster';
import { MovieItemEditDeleteButton } from './MovieItemEditDeleteButton';
import { movieItemStyles } from '../MovieItemStatic/MovieItemStatic';
import { selectMovieItemAtom } from '@/components/list/ListMovies/ListMoviesEdit';
import { useIsSelected } from './hooks/useIsSelected';
import { useMovieDetails } from '../MovieDetails/MovieDetailsStatic';
import { userAgent } from '@/utils';

export const movieItemStore = createStore();
export const movieItemAtom = atom<Movie>({} as Movie);

export const useMovieItemContext = () => {
  const movie = movieItemStore.get(movieItemAtom);
  if (!movie) throw new Error('MovieItemEdit: movieItemAtom is not set.');

  return movie;
};

type MovieItemProps = {
  index: number;
  movie: Movie;
  posterSrc?: 'tmdb' | 'default';
  prevMovieId?: number;
  nextMovieId?: number;
};

export const MovieItemEdit = memo(({ index, movie, posterSrc = 'default' }: MovieItemProps) => {
  movieItemStore.set(movieItemAtom, movie);

  const { preloadImg } = usePreloadStaticPoster(movie.posterPath);
  if (posterSrc === 'tmdb') preloadImg();

  const itemRef = useRef(null);

  const setSelectedMovie = useSetAtom(selectMovieItemAtom);
  useEventListener(
    'click',
    (e) => {
      if (e.shiftKey) {
        e.stopPropagation();
        setSelectedMovie(index);
      }
    },
    itemRef
  );

  const { isSelected } = useIsSelected(index);

  const movieDetails = useMovieDetails();

  const { isMobile } = userAgent();

  return (
    <Provider store={movieItemStore}>
      <li
        ref={itemRef}
        className={clsx(movieItemStyles, isSelected && 'default-shadow scale-95 brightness-75')}
        onClick={(e) => {
          movieDetails.toggle(movie.id);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') movieDetails.toggle(movie.id);
        }}
        tabIndex={0}
      >
        <MovieItemStaticPoster posterPath={movie.posterPath} posterSrc={posterSrc} title={movie.title} />
        <div
          className={clsx('absolute top-1 right-1 ', {
            'opacity-100': isMobile,
            'opacity-0 focus-within:opacity-100 group-hover:opacity-100': !isMobile,
          })}
        >
          <MovieItemEditDeleteButton isSelected={isSelected} />
        </div>
      </li>
    </Provider>
  );
});
