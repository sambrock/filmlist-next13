import { useRef } from 'react';
import useSWRInfinite from 'swr/infinite';

import { api } from '@/api';
import { MAX_LIST_MOVIES } from '@/constants';
import { GET_GetListMovies } from '@/pages/api/v1/getListMovies';

const getPlaceholders = (listTotal: number, page: number) => {
  const lastPage = Math.ceil(listTotal / MAX_LIST_MOVIES);

  if (page === lastPage) {
    return Array.from({ length: listTotal % MAX_LIST_MOVIES }, (_, i) => i);
  } else {
    return Array.from({ length: MAX_LIST_MOVIES }, (_, i) => i);
  }
};

export const useGetListMoviesInfinite = (
  listId: string,
  listTotal: number,
  onSuccess?: (data: GET_GetListMovies['data'] | null) => void
) => {
  const hasMoreRef = useRef(true);
  const placeholdersRef = useRef<number[]>([]);
  // Prevent duplicate requests
  const loadedPageRefs = useRef<number[]>([1]);
  const pageRef = useRef(1);

  const swr = useSWRInfinite(
    (index) => ['getListMovies', listId, index + 1],
    (key) => {
      const page = key[2];
      pageRef.current = page;

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
      onSuccess: (data) => {
        if (data) {
          onSuccess?.(data?.pop() ?? null);
        }
      },
    }
  );

  return { ...swr, hasMore: hasMoreRef.current, placeholders: placeholdersRef.current };
};
