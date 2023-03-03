'use client';

import { useListStore } from '@/store/list/useListStore';
import { InitialListStoreData } from '@/server/list/getInitialListStoreData';

export const InitListStore = ({
  initialListData,
  initialListMovieIds,
}: {
  initialListData: string;
  initialListMovieIds: number[];
}) => {
  const parsed = JSON.parse(initialListData) as InitialListStoreData;
  if (!parsed) return null;
  useListStore.setState({
    data: {
      list: parsed,
      movies: new Map(parsed?.movies.map((movie) => [movie.movieId.toString(), movie])),
    },
    _listMovieIds: initialListMovieIds,
  });

  return null;
};
