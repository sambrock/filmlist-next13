'use client';

import { MinusOutlined } from '@ant-design/icons';

import { useListStore } from '@/store/list/useListStore';
import { useMovieItemContext } from './MovieItemEdit';
import { ButtonIcon } from '@/components/common/ButtonIcon';

const dispatch = useListStore.getState().dispatch;

export const MovieItemEditDeleteButton = () => {
  const { id } = useMovieItemContext();

  return (
    <ButtonIcon
      size="small"
      tone="critical"
      // className="flex h-5 w-5 items-center justify-center rounded-sm bg-black/50 p-2 leading-none hover:bg-black-700 hover:text-red-500"
      onClick={() =>
        dispatch({
          type: 'REMOVE_MOVIE',
          payload: id.toString(),
        })
      }
      icon={<MinusOutlined />}
    ></ButtonIcon>
  );
};
