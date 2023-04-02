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
      if (e.shiftKey) setSelectedMovie(index);
    },
    itemRef
  );

  const { isSelected } = useIsSelected(index);

  return (
    <Provider store={movieItemStore}>
      <li ref={itemRef} className={clsx(movieItemStyles, isSelected && 'default-shadow scale-95 brightness-75')}>
        <MovieItemStaticPoster posterPath={movie.posterPath} posterSrc={posterSrc} title={movie.title} />
        <div className="invisible absolute top-1 right-1 group-hover:visible">
          <MovieItemEditDeleteButton isSelected={isSelected} />
        </div>
        {/* <div className="invisible absolute top-1 left-1 group-hover:visible">
          <MovieItemEditMoreOptions />
        </div> */}
      </li>
    </Provider>
  );
});

// (prevProps, nextProps) => prevProps.movie.id === nextProps.movie.id
