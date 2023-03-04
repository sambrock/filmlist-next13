'use client';

import type { Movie } from '@prisma/client';
import { clsx } from 'clsx';
import { forwardRef, Fragment } from 'react';

import { MoviePoster } from '../movie/MoviePoster';

export const MovieSearchResultsList = forwardRef<HTMLUListElement, React.PropsWithChildren<object>>((props, ref) => {
  return (
    <Fragment>
      <div className="border-t border-black-500 pt-2" />
      <ul ref={ref} className="mx-2 mb-2 max-h-80  overflow-y-auto rounded-b-md bg-black-700">
        {props.children}
      </ul>
    </Fragment>
  );
});

export const MovieSearchResultsListItem = ({
  movie,
  isHighlighted,
  trailing,
  ...props
}: React.ComponentProps<'li'> & {
  movie: Movie & { director: string };
  isHighlighted: boolean;
  trailing?: React.ReactNode;
}) => {
  return (
    <li
      className={clsx('group flex cursor-pointer items-center gap-1 rounded-md p-1', {
        'bg-black-500': isHighlighted,
      })}
      {...props}
    >
      <MoviePoster posterPath={movie.posterPath} className="h-[48px] w-[32px] shadow-sm shadow-black/70" />
      <div className="flex w-full flex-col gap-1 rounded py-[4.5px] px-2">
        <div className="flex items-center space-x-1">
          <div
            className={clsx('max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-medium', {
              'text-white-text': isHighlighted,
              'text-white/70': !isHighlighted,
            })}
          >
            {movie.title}
          </div>
          <div
            className={clsx('text-xs', {
              'text-white/60': isHighlighted,
              'text-white/40': !isHighlighted,
            })}
          >
            {new Date(movie.releaseDate).getFullYear()}
          </div>
        </div>
        <span className="max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap text-xs leading-none text-white/40">
          Dir. {movie.director}
        </span>
      </div>
      {trailing && <div className="ml-auto mr-1">{trailing}</div>}
    </li>
  );
};
