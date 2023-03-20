import type { Movie } from '@prisma/client';
import { clsx } from 'clsx';
import { MovieItemStaticPoster } from './MovieItemStaticPoster';

export const movieItemStyles = clsx(
  'fade-black-800-gradient-180 group relative aspect-poster cursor-pointer overflow-clip rounded-sm'
);

export const MovieItemStatic = ({ movie }: { movie: Movie }) => {
  return (
    <li className={clsx(movieItemStyles)}>
      <MovieItemStaticPoster posterPath={movie.posterPath} posterSrc={'default'} title={movie.title} />
    </li>
  );
};
