'use client';

import { useAtomValue } from 'jotai';
import { shallow } from 'zustand/shallow';

import { useGetMovieDetails } from '@/hooks/api/useGetMovieDetails';
import { activeMovieIdAtom, isMovieDetailsActiveAtom } from './MovieDetailsStatic';
import { useListStore } from '@/store/list/useListStore';
import { MovieDetails } from './MovieDetails';

export const MovieDetailsEdit = () => {
  const listMovieIds = useListStore((state) => [...state._listMovieIds], shallow);

  const movieId = useAtomValue(activeMovieIdAtom);
  const isMovieDetailsActive = useAtomValue(isMovieDetailsActiveAtom);

  const { data } = useGetMovieDetails(
    movieId,
    movieId === -1,
    listMovieIds[listMovieIds.indexOf(movieId) - 1],
    listMovieIds[listMovieIds.indexOf(movieId) + 1]
  );

  if (!isMovieDetailsActive) return null;
  if (!data) return <div>Loading...</div>;
  return <MovieDetails movie={data} />;
};
