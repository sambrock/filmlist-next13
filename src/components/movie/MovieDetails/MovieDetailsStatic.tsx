'use client';

import { useEffect, useState } from 'react';
import { atom, useAtom, useSetAtom } from 'jotai';
import { useEventListener } from 'usehooks-ts';
import { Transition } from 'react-transition-group';

import { useGetMovieDetails } from '@/hooks/api/useGetMovieDetails';
import { MovieDetails } from './MovieDetails';
import { useAnimation } from '@/hooks/useAnimation';
import { ModalContainer } from '@/components/common/Modal';

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
    }

    if (e.key === 'ArrowRight') {
      if (!isMovieDetailsActive) return;
      e.preventDefault();
      e.stopPropagation();
      if (listMovieIds.indexOf(movieId) + 1 < listMovieIds.length) {
        setMovieId(listMovieIds[listMovieIds.indexOf(movieId) + 1]);
      }
    }

    if (e.key === 'ArrowLeft') {
      if (!isMovieDetailsActive) return;
      e.preventDefault();
      e.stopPropagation();
      if (listMovieIds.indexOf(movieId) - 1 >= 0) {
        setMovieId(listMovieIds[listMovieIds.indexOf(movieId) - 1]);
      }
    }
  });

  // This is to get the animation to reset on exit
  // The animation doesn't trigger the second time without this
  // Should be fixed in the future, but this works for now
  const [animateMovieDetailsIn, setAnimateMovieDetailsIn] = useState(false);
  useEffect(() => {
    if (isMovieDetailsActive && data) {
      setAnimateMovieDetailsIn(true);
    }

    return () => {
      setAnimateMovieDetailsIn(false);
    };
  }, [isMovieDetailsActive, data]);

  const animationModalContainer = useAnimation(isMovieDetailsActive, { animation: 'blur' });
  const animationMovieDetails = useAnimation(animateMovieDetailsIn, { animation: 'movie-modal' });

  const { close } = useMovieDetails();

  return (
    <Transition {...animationModalContainer.getTransitionProps()}>
      {(state) => (
        <ModalContainer
          {...animationModalContainer.getAnimationProps(state)}
          isOpen={isMovieDetailsActive}
          onClick={close}
        >
          <Transition
            {...animationMovieDetails.getTransitionProps()}
            onExited={() => {
              setAnimateMovieDetailsIn(false);
            }}
          >
            {(state) => (
              <div {...animationMovieDetails.getAnimationProps(state)}>
                <MovieDetails movie={data} />
              </div>
            )}
          </Transition>
        </ModalContainer>
      )}
    </Transition>
  );
};
