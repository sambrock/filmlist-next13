import { useCallback, useReducer, useRef } from 'react';
import { clsx } from 'clsx';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

type State = {
  isOpen: boolean;
};

type Action = {
  type: 'OPEN' | 'CLOSE' | 'TOGGLE';
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'OPEN':
      return { isOpen: true };
    case 'CLOSE':
      return { isOpen: false };
    case 'TOGGLE':
      return { isOpen: !state.isOpen };
    default:
      return state;
  }
};

export const useMenu = ({
  containerRef,
  onOpen,
}: {
  containerRef: React.RefObject<HTMLElement>;
  onOpen?: () => void;
}) => {
  const [state, dispatch] = useReducer(reducer, { isOpen: false });

  const getContainerProps = useCallback(<T>(props?: React.HTMLAttributes<T>): React.HTMLAttributes<T> => {
    return {
      ...props,
      className: clsx('relative', props?.className),
    };
  }, []);

  const getMenuButtonProps = useCallback(<T>(props?: React.HTMLAttributes<T>): React.HTMLAttributes<T> => {
    return {
      ...props,
      onClick: (e) => {
        if (!state.isOpen) onOpen?.();
        dispatch({ type: 'TOGGLE' });
        props?.onClick?.(e);
      },
    };
  }, []);

  const getMenuProps = useCallback(
    <T>(props?: React.HTMLAttributes<T>): React.HTMLAttributes<T> => {
      return {
        ...props,
        hidden: !state.isOpen,
        className: clsx('absolute right-0 mt-2', props?.className),
      };
    },
    [state]
  );

  useOnClickOutside(containerRef, () => dispatch({ type: 'CLOSE' }), 'mouseup');

  useEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!state.isOpen) return;
      dispatch({ type: 'CLOSE' });
    }
  });

  return {
    isOpen: state.isOpen,
    open: () => dispatch({ type: 'OPEN' }),
    close: () => dispatch({ type: 'CLOSE' }),
    toggle: () => dispatch({ type: 'TOGGLE' }),

    getContainerProps,
    getMenuButtonProps,
    getMenuProps,
  };
};
