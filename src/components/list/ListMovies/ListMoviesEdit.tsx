'use client';

import type { Movie } from '@prisma/client';
import { shallow } from 'zustand/shallow';

import { useListStore } from '@/store/list/useListStore';
import { MovieItem } from '@/components/movie/MovieItem';
import { MovieAdd } from '@/components/movie/MovieAdd';

const getMovie = (key: string) => useListStore.getState().data.movies.get(key);

export const ListMoviesEdit = ({ initialMovies }: { initialMovies: string }) => {
  const keys = useListStore(
    (state) => [...state.data.movies.values()].sort((a, b) => a.order - b.order).map((v) => v.movieId.toString()),
    shallow
  );

  if (!keys || !keys.length) {
    return (
      <ul className="mb-44 grid grid-cols-7 gap-2" suppressHydrationWarning={true}>
        {(JSON.parse(initialMovies) as Movie[]).map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
        <MovieAdd />
      </ul>
    );
  }
  return (
    <ul className="mb-44 grid grid-cols-7 gap-2" suppressHydrationWarning={true}>
      {keys.map((key) => {
        const data = getMovie(key);
        if (!data) return null;
        return (
          <MovieItem key={data.movieId} movie={data.movie} posterSrc={data._isFromInitialData ? 'default' : 'tmdb'} />
        );
      })}
      <MovieAdd />
    </ul>
  );
};
