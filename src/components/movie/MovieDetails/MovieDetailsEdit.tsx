'use client';

import { useAtom } from 'jotai';
import { shallow } from 'zustand/shallow';
import { useEventListener } from 'usehooks-ts';

import { useGetMovieDetails } from '@/hooks/api/useGetMovieDetails';
import { activeMovieIdAtom, isMovieDetailsActiveAtom } from './MovieDetailsStatic';
import { useListStore } from '@/store/list/useListStore';
import { MovieDetails } from './MovieDetails';

export const MovieDetailsEdit = () => {
  const listMovieIds = useListStore((state) => [...state._listMovieIds], shallow);

  const [movieId, setMovieId] = useAtom(activeMovieIdAtom);
  const [isMovieDetailsActive, setIsMovieDetailsActive] = useAtom(isMovieDetailsActiveAtom);

  const { data } = useGetMovieDetails(
    movieId,
    movieId === -1,
    listMovieIds[listMovieIds.indexOf(movieId) - 1],
    listMovieIds[listMovieIds.indexOf(movieId) + 1]
  );

  useEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!isMovieDetailsActive) return;
      e.preventDefault();
      e.stopPropagation();
      setIsMovieDetailsActive(false);
      setMovieId(-1);
    }

    if (e.key === 'ArrowRight') {
      if (!isMovieDetailsActive) return;
      e.preventDefault();
      e.stopPropagation();
      setMovieId(listMovieIds[listMovieIds.indexOf(movieId) + 1]);
      // scroll to top
    }

    if (e.key === 'ArrowLeft') {
      if (!isMovieDetailsActive) return;
      e.preventDefault();
      e.stopPropagation();
      setMovieId(listMovieIds[listMovieIds.indexOf(movieId) - 1]);
    }
  });

  if (!isMovieDetailsActive) return null;
  if (!data) return <div>Loading...</div>;
  return <MovieDetails movie={data} />;
};
