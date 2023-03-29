import { useCallback, useReducer } from 'react';
import { clsx } from 'clsx';
import { useEventListener } from 'usehooks-ts';

type State = {
  highlightedIndex: number;
};

type Action =
  | {
      type: 'ARROW_UP';
      payload: number;
    }
  | {
      type: 'ARROW_DOWN';
      payload: number;
    }
  | {
      type: 'SET_HIGHLIGHTED_INDEX';
      payload: number;
    }
  | {
      type: 'RESET';
    };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ARROW_UP':
      return { highlightedIndex: action.payload };
    case 'ARROW_DOWN':
      return { highlightedIndex: action.payload };
    case 'SET_HIGHLIGHTED_INDEX':
      return { highlightedIndex: action.payload };
    case 'RESET':
      return { highlightedIndex: 0 };
    default:
      return state;
  }
};

export const useNavigateListWithKeyboard = ({
  containerRef,
  listRef,
}: {
  containerRef: React.RefObject<HTMLElement>;
  listRef: React.RefObject<HTMLElement>;
}) => {
  const [state, dispatch] = useReducer(reducer, { highlightedIndex: 0 });

  useEventListener(
    'keydown',
    (e) => {
      if (!listRef.current) return;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (state.highlightedIndex === 0) return;
        dispatch({ type: 'ARROW_UP', payload: state.highlightedIndex - 1 });
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        // find children that are list items
        const listItems = Array.from(listRef.current.children).filter((child) => child instanceof HTMLLIElement);
        if (state.highlightedIndex === listItems.length - 1) return;
        dispatch({ type: 'ARROW_DOWN', payload: state.highlightedIndex + 1 });
      }
    },
    containerRef
  );

  const getContainerProps = useCallback(<T>(props?: React.HTMLAttributes<T>): React.HTMLAttributes<T> => {
    return {
      ...props,
      className: clsx('relative', props?.className),
      tabIndex: 1,
    };
  }, []);

  // const getListProps = useCallback(<T>(props?: React.HTMLAttributes<T>): React.HTMLAttributes<T> => {
  //   return {
  //     ...props,
  //     // className: clsx('outline-none', props?.className),
  //     // tabIndex: 1,
  //   };
  // }, []);

  const getListItemProps = useCallback(
    <T>(index: number, props?: React.HTMLAttributes<T>): React.HTMLAttributes<T> => {
      return {
        ...props,
        onMouseEnter: (e) => {
          dispatch({
            type: 'SET_HIGHLIGHTED_INDEX',
            payload: index,
          });
          props?.onMouseMove?.(e);
        },
      };
    },
    [state.highlightedIndex]
  );

  return {
    highlightedIndex: state.highlightedIndex,
    reset: () => dispatch({ type: 'RESET' }),
    getContainerProps,
    getListItemProps,
    // getListProps,
  };
};
