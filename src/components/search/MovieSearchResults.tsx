'use client';

import { useAtomValue } from 'jotai';
import useSWRImmutable from 'swr/immutable';
import type { Movie } from '@prisma/client';

import { searchQueryAtom } from './MovieSearch';
import { MoviePoster } from '../movie/MoviePoster';
import { useListStore } from '@/store/list/useListStore';
import { api } from '@/api/api';

const dispatch = useListStore.getState().dispatch;

export const MovieSearchResults = () => {
  const q = useAtomValue(searchQueryAtom);

  const { data } = useSWRImmutable(['search', q], q ? () => api.get('/api/v1/searchMovies', { params: { q } }) : null, {
    keepPreviousData: true,
  });

  if (q === '') return null;
  if (!data || data.length === 0) return null;
  return (
    <ul className="w-full space-y-2 rounded-b-md border border-black-500 bg-black-700 px-2 py-2 shadow-xl shadow-black/30">
      {data.slice(0, 4).map((movie) => (
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
