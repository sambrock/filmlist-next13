import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';

import { selectedMovieItemsAtom } from '@/components/list/ListMovies/ListMoviesEdit';

export const useIsSelected = (index: number) => {
  const [isSelected] = useAtom(
    useMemo(
      () =>
        atom((get) => {
          const selectedMovieItems = get(selectedMovieItemsAtom);
          return selectedMovieItems.includes(index);
        }),
      [index]
    )
  );

  return { isSelected };
};
