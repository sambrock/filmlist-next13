import { useCallback } from 'react';
import { clsx } from 'clsx';
import type { TransitionStatus, TransitionProps } from 'react-transition-group/Transition';

type AnimationOpts = {
  animation?: keyof typeof animationStyles;
  timeout?: number;
};

const animationStyles = {
  fade: {
    default: 'transition-opacity default-animation-timing',
    exiting: 'opacity-0',
    exited: 'opacity-0',
    entering: 'opacity-100',
    entered: 'opacity-100',
    unmounted: undefined,
  },
  pop: {
    default: 'transition-all default-animation-timing origin-top',
    entering: 'opacity-100 scale-100',
    entered: 'opacity-100 scale-100',
    exiting: 'opacity-0 scale-[.96]',
    exited: 'opacity-0 scale-[.96]',
    unmounted: undefined,
  },
  blur: {
    default: 'transition-all default-animation-timing',
    entering: 'opacity-100 backdrop-blur-sm',
    entered: 'opacity-100 backdrop-blur-sm',
    exiting: 'opacity-0 backdrop-blur-none',
    exited: 'opacity-0 backdrop-blur-none',
    unmounted: undefined,
  },
  'movie-modal': {
    default: 'transition-all default-animation-timing origin-bottom',
    entering: 'opacity-100 scale-100',
    entered: 'opacity-100 scale-100',
    exiting: 'opacity-0 scale-[.96]',
    exited: 'opacity-0 scale-[.96]',
    unmounted: undefined,
  },
} as const;

export const useAnimation = (animateIn: boolean, { timeout = 200, animation = 'fade' }: AnimationOpts = {}) => {
  const getTransitionProps = useCallback((): TransitionProps => {
    return {
      in: animateIn,
      timeout,
      mountOnEnter: true,
      unmountOnExit: true,
    };
  }, [animateIn, timeout]);

  const getAnimationProps = useCallback(
    <T>(animationState: TransitionStatus, props?: React.HTMLAttributes<T>) => {
      return {
        ...props,
        className: clsx(
          props?.className,
          animationStyles[animation]['default'],
          animationStyles[animation][animationState]
        ),
      };
    },
    [animation]
  );

  return {
    getTransitionProps,
    getAnimationProps,
  };
};
