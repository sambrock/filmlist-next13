'use client';

import { useRef, useState } from 'react';
import type { Movie } from '@prisma/client';
import { shallow } from 'zustand/shallow';
import useSWR from 'swr';
import { atom, createStore, Provider, useSetAtom } from 'jotai';
import { useSsr } from 'usehooks-ts';

import { useListStore } from '@/store/list/useListStore';
import { MovieItemEdit } from '@/components/movie/MovieItemEdit/MovieItemEdit';
import { ListMoviesGrid } from './ListMoviesGrid';
import { Observable } from '@/components/common/Observable';
import { api } from '@/api';
import { MAX_LIST_MOVIES } from '@/constants';
import { MovieDetailsEdit } from '@/components/movie/MovieDetails/MovieDetailsEdit';

export const movieListStore = createStore();
export const selectedMovieItemsAtom = atom<number[]>([]);
export const selectMovieItemAtom = atom(null, (get, set, index: number) => {
  // if shift click is pressed, take the first selected item and select all items between the first selected item and the current item
  const selectedMovieItems = get(selectedMovieItemsAtom);
  if (selectedMovieItems.length > 0) {
    const firstSelectedMovieItem = selectedMovieItems[0];
    const newSelectedMovieItems = [];
    for (let i = Math.min(firstSelectedMovieItem, index); i <= Math.max(firstSelectedMovieItem, index); i++) {
      newSelectedMovieItems.push(i);
    }
    set(selectedMovieItemsAtom, newSelectedMovieItems);
    return;
  } else {
    set(selectedMovieItemsAtom, [index]);
  }
});
const placeholdersAtom = atom<number[]>([]);

movieListStore.set(selectedMovieItemsAtom, []);

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

  const { isServer } = useSsr();
  if (isServer) {
    return (
      <ListMoviesGrid>
        {(JSON.parse(initialMovies) as Movie[]).map((movie, index) => (
          <MovieItemEdit key={movie.id} index={index} movie={movie} />
        ))}
        {observerLoader && observerLoader}
      </ListMoviesGrid>
    );
  }
  return (
    <Provider store={movieListStore}>
      <ListMoviesGrid>
        {keys.map((key, index) => {
          const data = getMovie(key);
          if (!data) return null;
          return (
            <MovieItemEdit
              key={data.movieId}
              index={index}
              movie={data.movie}
              posterSrc={data._isFromInitialData ? 'default' : 'tmdb'}
              prevMovieId={getMovie(keys[index - 1] ? keys[index - 1] : keys[keys.length - 1])?.movieId}
              nextMovieId={getMovie(keys[index + 1] ? keys[index + 1] : keys[0])?.movieId}
            />
          );
        })}
        {observerLoader && observerLoader}
      </ListMoviesGrid>

      <MovieDetailsEdit />
    </Provider>
  );
};

const dispatch = useListStore.getState().dispatch;

export const ListMoviesEditObservable = ({
  listId,
  isActive,
  listCount,
}: {
  listId: string;
  isActive: boolean;
  listCount: number;
}) => {
  const [page, setPage] = useState(2); // (first page is loaded on the server)

  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const setPlaceholders = useSetAtom(placeholdersAtom);

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
