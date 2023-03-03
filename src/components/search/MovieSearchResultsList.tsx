'use client';

import type { Movie } from '@prisma/client';
import { clsx } from 'clsx';

import { MoviePoster } from '../movie/MoviePoster';

export const MovieSearchResultsList = (props: React.PropsWithChildren<object>) => {
  return <ul className="rounded-b-md border-t border-black-500 bg-black-700 px-2 py-2">{props.children}</ul>;
};

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
      <MoviePoster posterPath={movie.posterPath} className="max-w-[32px] shadow-sm shadow-black/70" />
      <div className="flex w-full flex-col gap-1 rounded py-[4.5px] px-2">
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium text-white/70 group-hover:text-white-text">{movie.title}</span>
          <span className="text-xs text-white/40 group-hover:text-white/60">
            {new Date(movie.releaseDate).getFullYear()}
          </span>
        </div>
        <span className="text-xs leading-none text-white/40">Dir. {movie.director}</span>
      </div>
      {trailing && <div className="ml-auto mr-1">{trailing}</div>}
    </li>
  );
};
