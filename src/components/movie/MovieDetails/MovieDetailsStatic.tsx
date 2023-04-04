import { atom, useSetAtom } from 'jotai';

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

export const MovieDetailsStatic = () => {
  return null;
};
