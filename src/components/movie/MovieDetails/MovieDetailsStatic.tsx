'use client';

import { useGetMovieDetails } from '@/hooks/api/useGetMovieDetails';
import { atom, useAtom, useSetAtom } from 'jotai';
import { useEventListener } from 'usehooks-ts';
import { MovieDetails } from './MovieDetails';

export const activeMovieIdAtom = atom<number>(-1);
export const isMovieDetailsActiveAtom = atom(false);

export const useMovieDetails = () => {
  const setActiveMovieId = useSetAtom(activeMovieIdAtom);
  const setIsMovieDetailsActive = useSetAtom(isMovieDetailsActiveAtom);

  return {
    toggle: (movieId: number) => {
      setActiveMovieId(movieId);
      setIsMovieDetailsActive(true);
    },
    close: () => {
      setActiveMovieId(-1);
      setIsMovieDetailsActive(false);
    },
  };
};

export const MovieDetailsStatic = ({ listMovieIds }: { listMovieIds: number[] }) => {
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
