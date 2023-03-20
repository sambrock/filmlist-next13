'use client';

import { useRef, useState } from 'react';
import type { Movie } from '@prisma/client';
import { shallow } from 'zustand/shallow';
import useSWR from 'swr';

import { useListStore } from '@/store/list/useListStore';
import { MovieItemEdit } from '@/components/movie/MovieItemEdit/MovieItemEdit';
import { ListMoviesGrid } from './ListMoviesGrid';
import { Observable } from '@/components/common/Observable';
import { api } from '@/api';
import { MAX_LIST_MOVIES } from '@/constants';

const getMovie = (key: string) => useListStore.getState().data.movies.get(key);

export const ListMoviesEdit = ({
  initialMovies,
  observerLoader,
}: {
  initialMovies: string;
  observerLoader?: React.ReactNode;
}) => {
  const keys = useListStore(
    (state) =>
      [...state.data.movies.values()]
        .sort((a, b) => {
          if (a.order < b.order) return -1;
          if (a.order > b.order) return 1;
          return 0;
        })
        .map((v) => v.movieId.toString()),
    shallow
  );

  if (keys.length === 0 || !keys) {
    return (
      <ListMoviesGrid>
        {(JSON.parse(initialMovies) as Movie[]).map((movie, index) => (
          <MovieItemEdit key={movie.id} movie={movie} />
        ))}
        {observerLoader && observerLoader}
      </ListMoviesGrid>
    );
  }
  return (
    <ListMoviesGrid>
      {keys.map((key) => {
        const data = getMovie(key);
        if (!data) return null;
        return (
          <MovieItemEdit
            key={data.movieId}
            movie={data.movie}
            posterSrc={data._isFromInitialData ? 'default' : 'tmdb'}
          />
        );
      })}
      {observerLoader && observerLoader}
    </ListMoviesGrid>
  );
};

const dispatch = useListStore.getState().dispatch;

export const ListMoviesEditObservable = ({ listId, isActive }: { listId: string; isActive: boolean }) => {
  const [page, setPage] = useState(2);

  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const { isLoading } = useSWR(
    [listId, page],
    hasMoreRef.current ? () => api.get('/api/v1/getListMovies', { params: { listId, page: page.toString() } }) : null,
    {
      onSuccess: (data) => {
        dispatch({ type: 'ADD_MOVIES', payload: data });
        if (data.length < MAX_LIST_MOVIES) {
          hasMoreRef.current = false;
        }
      },
    }
  );

  if (!isActive) return null;
  return (
    <Observable
      onObserve={() => {
        if (!isLoading) {
          setPage((page) => page + 1);
          isLoadingRef.current = true;
        }
      }}
    />
  );
};
