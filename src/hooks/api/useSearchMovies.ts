import { useRef, useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import { api } from '@/api/api';
import type { GET_SearchMovies } from '@/pages/api/v1/searchMovies';

// Might be a better way to do this, but this works for now

export const useSearchMovies = (
  params: GET_SearchMovies['params'],
  onHasMoreChange?: (hasMore: boolean) => void,
  onSuccess?: () => void
) => {
  const [prevData, setPrevData] = useState<GET_SearchMovies['data']>([]);

  const prevKey = useRef<string[]>([]);

  const swr = useSWRImmutable(
    params.q ? ['search', params.q, params.page] : null,
    () => api.get('/api/v1/searchMovies', { params }),
    {
      keepPreviousData: true,
      compare: () => {
        // Don't rerender, updating state is fine
        return true;
      },
      onSuccess(data, key) {
        onSuccess?.();

        if (prevKey.current[1] !== key.split(',')[1]) {
          setPrevData([...data]);
        } else {
          setPrevData([...prevData, ...data]);
        }

        if (data.length === 0) {
          onHasMoreChange?.(false);
        } else {
          onHasMoreChange?.(true);
        }

        prevKey.current = key.split(',');
      },
    }
  );

  return {
    ...swr,
    data: prevData,
  };
};
