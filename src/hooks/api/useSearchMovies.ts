// import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';

import { api } from '@/api/api';
import { GET_SearchMovieData } from '@/pages/api/v1/searchMovies';

export const useSearchMovies = (searchQuery: string) => {
  return useSWRImmutable<GET_SearchMovieData>(
    ['search', searchQuery],
    searchQuery
      ? () => api.get<GET_SearchMovieData>({ pathname: '/api/v1/searchMovies', query: { q: searchQuery } })
      : null,
    {
      keepPreviousData: true,
    }
  );
};
