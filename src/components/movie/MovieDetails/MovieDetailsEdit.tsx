'use client';

import { shallow } from 'zustand/shallow';

import { MovieDetailsStatic } from './MovieDetailsStatic';
import { useListStore } from '@/store/list/useListStore';

export const MovieDetailsEdit = () => {
  const listMovieIds = useListStore((state) => [...state._listMovieIds], shallow);

  return <MovieDetailsStatic listMovieIds={listMovieIds} />;
};
