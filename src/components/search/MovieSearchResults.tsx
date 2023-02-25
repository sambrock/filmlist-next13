'use client';

import { useAtomValue } from 'jotai';
import type { Movie } from '@prisma/client';

import { useSearchMovies } from '@/hooks/api/useSearchMovies';
import { searchQueryAtom } from './MovieSearch';
import { MoviePoster } from '../movie/MoviePoster';
import { MAX_SEARCH_RESULTS } from '@/utils/constants';
import { useListStore } from '@/store/list/useListStore';

const dispatch = useListStore.getState().dispatch;

export const MovieSearchResults = () => {
  const q = useAtomValue(searchQueryAtom);

  const { data } = useSearchMovies(q);

  if (q === '') return null;
  if (!data || data.length === 0) return null;
  return (
    <ul className="space-y-2 border-t border-black-400 bg-black-700 pt-2 pb-2">
      {data?.slice(0, MAX_SEARCH_RESULTS / 2).map((movie) => (
        <MovieSearchResult key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};

const MovieSearchResult = ({ movie }: { movie: Movie }) => {
  return (
    <li
      className="group flex cursor-pointer items-center gap-1"
      onClick={() => dispatch({ type: 'ADD_MOVIE', payload: movie })}
    >
      <MoviePoster posterPath={movie.posterPath} />
      <div className="flex  w-full flex-col gap-1 rounded py-[4.5px] px-2 group-hover:bg-black-500 group-hover:shadow">
        <div className="flex items-center space-x-1">
          <span className="text-sm text-white/70 group-hover:text-white-text">{movie.title}</span>
          <span className="text-xs text-white/40 group-hover:text-white/70">
            {new Date(movie.releaseDate).getFullYear()}
          </span>
        </div>
        <span className="text-xs leading-none text-white/40">Dir. Stanley Kubrick</span>
      </div>
    </li>
  );
};
