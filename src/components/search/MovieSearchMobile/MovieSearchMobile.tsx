'use client';

import { useAnimation } from '@/hooks/useAnimation';
import { clsx } from 'clsx';
import { atom, useAtomValue } from 'jotai';
import { Transition } from 'react-transition-group';

import { MovieSearchMobileButton } from './MovieSearchMobileButton';
import { MovieSearchMobileMenu } from './MovieSearchMobileMenu';

export const isMovieSearchMobileActiveAtom = atom(false);

export const MovieSearchMobile = () => {
  const isMovieSearchMobileActive = useAtomValue(isMovieSearchMobileActiveAtom);

  const animation = useAnimation(isMovieSearchMobileActive, { animation: 'pop' });

  return (
    <div className="block md:hidden">
      <MovieSearchMobileButton />
      <Transition {...animation.getTransitionProps()}>
        {(state) => (
          <div className={clsx(animation.getAnimationProps(state).className, 'absolute top-2 left-0 z-[9999] w-full')}>
            <MovieSearchMobileMenu />
          </div>
        )}
      </Transition>
    </div>
  );
};
