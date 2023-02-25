'use client';

import { useListStore } from '@/store/list/useListStore';

const dispatch = useListStore.getState().dispatch;

export const MovieItemDelete = ({ id }: { id: number }) => {
  return (
    <button
      onClick={() =>
        dispatch({
          type: 'REMOVE_MOVIE',
          payload: id.toString(),
        })
      }
    >
      Remove
    </button>
  );
};
