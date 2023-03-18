'use client';

import type { Movie } from '@prisma/client';
import { shallow } from 'zustand/shallow';

import { useListStore } from '@/store/list/useListStore';
import { MovieItem } from '@/components/movie/MovieItem';
import { ListMoviesGrid } from './ListMoviesGrid';

const getMovie = (key: string) => useListStore.getState().data.movies.get(key);

export const ListMoviesEdit = ({ initialMovies }: { initialMovies: string }) => {
  const keys = useListStore(
    (state) => [...state.data.movies.values()].sort((a, b) => a.order - b.order).map((v) => v.movieId.toString()),
    shallow
  );

  if (!keys.length) {
    return (
      <ListMoviesGrid>
        {(JSON.parse(initialMovies) as Movie[]).map((movie, index) => (
          <MovieItem key={movie.id} movie={movie} index={index} />
        ))}
      </ListMoviesGrid>
    );
  }
  return (
    <ListMoviesGrid>
      {keys.map((key, index) => {
        const data = getMovie(key);
        if (!data) return null;
        return (
          <MovieItem
            key={data.movieId}
            movie={data.movie}
            posterSrc={data._isFromInitialData ? 'default' : 'tmdb'}
            index={index}
          />
        );
      })}
    </ListMoviesGrid>
  );
};
