'use client';

import type { Movie } from '@prisma/client';
import { shallow } from 'zustand/shallow';

import { useListStore } from '@/store/list/useListStore';
import { MovieItem } from '@/components/movie/MovieItem';

const getMovie = (key: string) => useListStore.getState().data.movies.get(key)?.movie as Movie;

export const ListMoviesEdit = ({ initialMovies }: { initialMovies: Movie[] }) => {
  const keys = useListStore((state) => [...state.data.movies.keys()].reverse(), shallow);

  if (!keys || !keys.length) {
    return (
      <ul className="grid grid-cols-7 gap-2" suppressHydrationWarning={true}>
        {initialMovies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ul>
    );
  }
  return (
    <ul className="grid grid-cols-7 gap-2">
      {keys.map((key) => (
        <MovieItem key={key} movie={getMovie(key)} />
      ))}
    </ul>
  );
};
