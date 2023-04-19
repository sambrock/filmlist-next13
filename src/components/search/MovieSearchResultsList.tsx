'use client';

import { forwardRef, Fragment } from 'react';
import type { Movie } from '@prisma/client';
import { clsx } from 'clsx';

import { MoviePoster } from '../movie/MoviePoster';

export const MovieSearchResultsList = forwardRef<HTMLUListElement, React.PropsWithChildren<object>>((props, ref) => {
  return (
    <Fragment>
      <div className="border-t border-neutral-600 pt-2" />
      <ul
        ref={ref}
        className="mx-2 mb-2 max-h-80  overflow-y-auto rounded-b-md bg-neutral-700"
        data-cy="movie-search-results"
      >
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
      className={clsx('group flex w-full cursor-pointer items-center gap-1 rounded-md p-1', {
        'bg-neutral-500': isHighlighted,
      })}
      {...props}
    >
      <MoviePoster posterPath={movie.posterPath} className="h-[48px] w-[32px] shadow-sm shadow-neutral-800" />
      <div className="inline-flex flex-col gap-1 rounded py-[4.5px] px-2 md:max-w-[70%] lg:max-w-[80%]">
        <div className="flex items-center space-x-1">
          <div
            className={clsx('inline overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-medium', {
              'text-off-white': isHighlighted,
              'text-white/70': !isHighlighted,
            })}
          >
            {movie.title}
          </div>
          <div
            className={clsx('text-xs font-medium', {
              'text-white/60': isHighlighted,
              'text-white/40': !isHighlighted,
            })}
          >
            {new Date(movie.releaseDate).getFullYear()}
          </div>
        </div>
        <span className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xs font-medium leading-none text-white/40">
          Dir. {movie.director}
        </span>
      </div>
      {trailing && <div className="ml-auto mr-1 flex items-center self-center">{trailing}</div>}
    </li>
  );
};
