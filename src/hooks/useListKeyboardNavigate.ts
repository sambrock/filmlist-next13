import { useReducer, useRef } from 'react';
import { useEventListener } from 'usehooks-ts';

type Actions = { type: 'ARROW_UP' } | { type: 'ARROW_DOWN' } | { type: 'SET_INDEX'; payload: number };

type State = {
  focusedIndex: number;
};

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'SET_INDEX':
      return {
        ...state,
        focusedIndex: action.payload,
      };
    case 'ARROW_UP':
      return {
        ...state,
        focusedIndex: state.focusedIndex - 1,
      };
    case 'ARROW_DOWN':
      return {
        ...state,
        focusedIndex: state.focusedIndex + 1,
      };
    default:
      return state;
  }
};

export const useListKeyboardNavigate = ({
  listRef,
  length,
  onSelect,
}: {
  listRef: React.RefObject<HTMLElement>;
  length: number;
  onSelect: (focusedIndex: number) => void;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    focusedIndex: 0,
  });

  // const listRef = useRef<HTMLUListElement>(null);

  useEventListener(
    'keydown',
    (e: KeyboardEvent) => {
      if (!listRef.current) return;

      switch (e.key) {
        case 'ArrowUp':
          {
            e.preventDefault();
            if (state.focusedIndex === 0) return;
            dispatch({ type: 'ARROW_UP' });
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (state.focusedIndex === length - 1) return;
          dispatch({ type: 'ARROW_DOWN' });
          break;
        case 'Enter':
          onSelect(state.focusedIndex);
          break;
        default:
          break;
      }
    },
    listRef
  );

  return {
    focusedIndex: state.focusedIndex,
    setFocusedIndex: (index: number) => dispatch({ type: 'SET_INDEX', payload: index }),
  };
};
