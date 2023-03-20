import { useRef } from 'react';
import useSWRInfinite from 'swr/infinite';

import { api } from '@/api';

export const useSearchMovies = (q: string) => {
  const hasMoreRef = useRef(true);

  const swr = useSWRInfinite(
    (index) => ['searchMovies', q, index + 1],
    (key) =>
      hasMoreRef.current && q
        ? api.get('/api/v1/searchMovies', { params: { q: key[1], page: key[2].toString() } })
        : null,
    {
      keepPreviousData: true,
      revalidateOnReconnect: false,
      revalidateFirstPage: false,
      revalidateOnFocus: false,
      revalidateOnMount: false,
      onSuccess: (data) => {
        const reversed = [...data].reverse();
        if (reversed[0]?.length === 0) {
          hasMoreRef.current = false;
        } else {
          hasMoreRef.current = true;
        }
      },
    }
  );

  return { ...swr, hasMore: hasMoreRef.current };
};
