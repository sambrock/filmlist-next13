import { api } from '@/api/api';
import useSWRInfinite from 'swr/infinite';

export const useGetListMoviesInfinite = (listId: string) => {
  return useSWRInfinite(
    (index) => ['getListMovies', listId, index + 1],
    (key) => (key[2] !== 1 ? api.get('/api/v1/getListMovies', { params: { listId, page: key[2].toString() } }) : null),
    {}
  );
};
