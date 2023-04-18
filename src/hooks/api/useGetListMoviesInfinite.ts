import { useRef } from 'react';
import useSWRInfinite from 'swr/infinite';

import { api } from '@/api';
import { MAX_LIST_MOVIES } from '@/constants';

const getPlaceholders = (listTotal: number, page: number) => {
  const lastPage = Math.ceil(listTotal / MAX_LIST_MOVIES);

  if (page === lastPage) {
    return Array.from({ length: listTotal % MAX_LIST_MOVIES }, (_, i) => i);
  } else {
    return Array.from({ length: MAX_LIST_MOVIES }, (_, i) => i);
  }
};

export const useGetListMoviesInfinite = (listId: string, listTotal: number) => {
  const hasMoreRef = useRef(true);
  const placeholdersRef = useRef<number[]>([]);
  // Prevent duplicate requests
  const loadedPageRefs = useRef<number[]>([1]);

  const swr = useSWRInfinite(
    (index) => ['getListMovies', listId, index + 1],
    (key) => {
      const page = key[2];

      if (loadedPageRefs.current.includes(page)) return null;
      if (!hasMoreRef.current) return null;

      loadedPageRefs.current.push(page);
      placeholdersRef.current = getPlaceholders(listTotal, page);

      if (page >= Math.ceil(listTotal / MAX_LIST_MOVIES) + 1) {
        hasMoreRef.current = false;
      }

      return api.get('/api/v1/getListMovies', { params: { listId, page: key[2].toString() } });
    },
    {
      revalidateAll: false,
      // onSuccess: (data) => {
      //   const dataCount = data.flat().length;
      //   console.log('dataCount', data, dataCount, listTotal);
      //   if (dataCount >= listTotal) {
      //     hasMoreRef.current = false;
      //   }
      // },
    }
  );

  return { ...swr, hasMore: hasMoreRef.current, placeholders: placeholdersRef.current };
};
