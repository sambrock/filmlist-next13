'use client';

import { useRef } from 'react';
import { useIsClient } from 'usehooks-ts';

import type { InitialListStoreData } from '@/server/list/getInitialListStoreData';
import { useListStore } from '@/store/list/useListStore';

export const InitializeStore = ({
  initialListData,
  initialListMovieIds,
}: {
  initialListData: string;
  initialListMovieIds: number[];
}) => {
  const isClient = useIsClient();
  const isInit = useRef(false);

  if (!isInit.current && isClient) {
    const parsed = JSON.parse(initialListData) as InitialListStoreData;
    if (!parsed) return null;
    useListStore.setState({
      data: {
        list: parsed,
        movies: new Map(
          parsed?.movies.map((movie) => [movie.movieId.toString(), { ...movie, _isFromInitialData: true }])
        ),
      },
      _listMovieIds: new Set(initialListMovieIds),
    });

    isInit.current = true;
  }

  return null;
};
