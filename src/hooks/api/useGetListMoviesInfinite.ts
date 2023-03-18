import { useRef } from 'react';
import useSWRInfinite from 'swr/infinite';

import { api } from '@/api';

export const useGetListMoviesInfinite = (listId: string, listTotal: number) => {
  const hasMoreRef = useRef(true);

  const swr = useSWRInfinite(
    (index) => ['getListMovies', listId, index + 1],
    (key) =>
      key[2] !== 1 && hasMoreRef.current
        ? api.get('/api/v1/getListMovies', { params: { listId, page: key[2].toString() } })
        : null,
    {
      revalidateAll: false,
      onSuccess: (data) => {
        const dataCount = data.flat().length;
        if (dataCount >= listTotal) {
          hasMoreRef.current = false;
        }
      },
    }
  );

  return swr;
};
