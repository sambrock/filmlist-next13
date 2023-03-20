'use client';

import { MinusOutlined } from '@ant-design/icons';

import { useListStore } from '@/store/list/useListStore';
import { useMovieItemContext } from './MovieItemEdit';

const dispatch = useListStore.getState().dispatch;

export const MovieItemEditDeleteButton = () => {
  const { id } = useMovieItemContext();

  return (
    <button
      className="flex h-5 w-5 items-center justify-center rounded-sm bg-black/50 p-2 leading-none hover:bg-black-700 hover:text-red-500"
      onClick={() =>
        dispatch({
          type: 'REMOVE_MOVIE',
          payload: id.toString(),
        })
      }
    >
      <MinusOutlined className="text-sm leading-none" />
    </button>
  );
};
