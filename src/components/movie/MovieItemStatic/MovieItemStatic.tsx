'use client';

import type { Movie } from '@prisma/client';
import { clsx } from 'clsx';

import { useMovieDetails } from '../MovieDetails/MovieDetailsStatic';
import { MovieItemStaticPoster } from './MovieItemStaticPoster';

export const movieItemStyles = clsx(
  'fade-black-800-gradient-180 group relative aspect-poster cursor-pointer overflow-clip rounded-sm outline-non default-focus-shadow'
);

export const MovieItemStatic = ({ movie }: { movie: Movie }) => {
  const movieDetails = useMovieDetails();

  return (
    <li
      className={clsx(movieItemStyles)}
      onClick={(e) => {
        movieDetails.toggle(movie.id);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') movieDetails.toggle(movie.id);
      }}
      tabIndex={0}
    >
      <MovieItemStaticPoster posterPath={movie.posterPath} posterSrc={'default'} title={movie.title} />
    </li>
  );
};
