'use client';

import { MinusOutlined } from '@ant-design/icons';

import { useListStore } from '@/store/list/useListStore';
import { useMovieItemContext } from './MovieItemEdit';
import { ButtonIcon } from '@/components/common/ButtonIcon';
import { movieListStore, selectedMovieItemsAtom } from '@/components/list/ListMovies/ListMoviesEdit';

const dispatch = useListStore.getState().dispatch;

export const MovieItemEditDeleteButton = ({ isSelected }: { isSelected: boolean }) => {
  const { id } = useMovieItemContext();

  return (
    <ButtonIcon
      size="small"
      tone="critical-blur"
      onClick={(e) => {
        e.stopPropagation();

        if (!isSelected) {
          dispatch({
            type: 'REMOVE_MOVIE',
            payload: id.toString(),
          });
        } else {
          dispatch({
            type: 'DELETE_MOVIES_BY_INDEX',
            payload: movieListStore.get(selectedMovieItemsAtom),
          });
          movieListStore.set(selectedMovieItemsAtom, []);
        }
      }}
      icon={<MinusOutlined />}
      data-cy="movie-item-delete-button"
    />
  );
};
