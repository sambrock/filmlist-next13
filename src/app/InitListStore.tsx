'use client';

import { useRef } from 'react';
import { useIsClient } from 'usehooks-ts';
import type { List, ListMovies, Movie } from '@prisma/client';

import { useListStore } from '@/store/list/useListStore';

export const InitListStore = ({ initialListData }: { initialListData: string }) => {
  const isInit = useRef(false);
  const isClient = useIsClient();

  if (!isInit.current && isClient) {
    if (!initialListData || initialListData === 'null') return;
    const parsed = JSON.parse(initialListData) as List & { movies: (ListMovies & { movie: Movie })[] };
    useListStore.setState({
      data: {
        list: parsed,
        movies: new Map(parsed.movies.map((movie) => [movie.listId + movie.movieId, movie])),
      },
    });
  }

  return null;
};
