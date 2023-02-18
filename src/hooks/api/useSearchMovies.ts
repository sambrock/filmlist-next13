import useSWR from 'swr';

import { api } from '@/api/api';
import { GET_SearchMovieData } from '@/pages/api/v1/searchMovies';

export const useSearchMovies = (searchQuery: string) => {
  return useSWR<GET_SearchMovieData>(
    ['search', searchQuery],
    () => api.get<GET_SearchMovieData>({ pathname: '/api/v1/searchMovies', query: { q: searchQuery } }),
    {
      keepPreviousData: true,
      isPaused: () => !searchQuery,
    }
  );
};
