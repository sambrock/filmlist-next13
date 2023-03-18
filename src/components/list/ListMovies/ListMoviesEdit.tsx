'use client';

import type { Movie } from '@prisma/client';
import { shallow } from 'zustand/shallow';

import { useListStore } from '@/store/list/useListStore';
import { MovieItem } from '@/components/movie/MovieItem';
import { ListMoviesGrid } from './ListMoviesGrid';
import { MoviePlaceholder } from '@/components/movie/MoviePlaceholder';

const getMovie = (key: string) => useListStore.getState().data.movies.get(key);

export const ListMoviesEdit = ({ initialMovies }: { initialMovies: string }) => {
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

  if (keys.length === 0 && (JSON.parse(initialMovies) as Movie[]).length === 0) {
    return (
      <ListMoviesGrid>
        <MoviePlaceholder />
      </ListMoviesGrid>
    );
  }
  if (keys.length === 0 || !keys) {
    return (
      <ListMoviesGrid>
        {(JSON.parse(initialMovies) as Movie[]).map((movie, index) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ListMoviesGrid>
    );
  }
  return (
    <ListMoviesGrid>
      {keys.map((key) => {
        const data = getMovie(key);
        if (!data) return null;
        return (
          <MovieItem key={data.movieId} movie={data.movie} posterSrc={data._isFromInitialData ? 'default' : 'tmdb'} />
        );
      })}
    </ListMoviesGrid>
  );
};
