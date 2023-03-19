import { memo } from 'react';
import Image from 'next/image';
import type { Movie } from '@prisma/client';

import { MOVIE_IMAGE_URL } from '@/constants';

type MovieItemProps = {
  movie: Movie;
  posterSrc?: 'tmdb' | 'default';
};

export const MovieItem = memo(({ movie, posterSrc = 'default' }: MovieItemProps) => {
  return (
    <li className="cursor-pointer rounded-sm" suppressHydrationWarning={true}>
      <Image
        className="aspect-poster h-full w-full rounded-sm"
        src={`${MOVIE_IMAGE_URL.poster.w342[posterSrc]}${movie.posterPath}`}
        width={342}
        height={513}
        alt={movie.title}
      />
    </li>
  );
});
