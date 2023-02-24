'use client';

import { useRef } from 'react';
import { useIsClient } from 'usehooks-ts';

import { useListStore } from '@/store/list/useListStore';
import { InitialListStoreData } from '@/server/list/getInitialListStoreData';

export const InitListStore = ({ initialListData }: { initialListData: string }) => {
  // const isInit = useRef(false);

  const parsed = JSON.parse(initialListData) as InitialListStoreData;
  useListStore.setState({
    data: {
      list: parsed,
      movies: new Map(parsed?.movies.map((movie) => [`${movie.listId}${movie.movieId}`, movie])),
    },
  });

  // if (!isInit.current && isClient) {
  //   if (!initialListData || initialListData === 'null') return;
  // }

  return null;
};
