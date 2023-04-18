'use client';

import type { Movie } from '@prisma/client';

import { ListMoviesGrid } from './ListMoviesGrid';
import { Observable } from '@/components/common/Observable';
import { useGetListMoviesInfinite } from '@/hooks/api/useGetListMoviesInfinite';
import { MovieItemStatic } from '@/components/movie/MovieItemStatic/MovieItemStatic';
import { MovieItemLoading } from '@/components/movie/MovieItemLoading';
import { MAX_LIST_MOVIES } from '@/constants';

type ListMovieStaticProps = {
  listId: string;
  initialMovies: string;
  listCount: number;
};

export const ListMoviesStatic = ({ listId, initialMovies, listCount }: ListMovieStaticProps) => {
  const { data, size, setSize, hasMore, isLoading, isValidating } = useGetListMoviesInfinite(
    listId,
    listCount - JSON.parse(initialMovies).length
  );

  const movies: Movie[] = JSON.parse(initialMovies)
    .concat(data?.flat().map((m) => m?.movie))
    .filter(Boolean);

  return (
    <ListMoviesGrid>
      {movies.map((movie, index) => (
        <MovieItemStatic key={movie.id} movie={movie} />
      ))}
      {(isValidating || isLoading) &&
        Array.from({ length: MAX_LIST_MOVIES }).map((_, index) => <MovieItemLoading key={index} />)}
      <Observable
        onObserve={() => {
          if (!hasMore || isLoading || isValidating) return;
          setSize(size + 1);
        }}
      />
    </ListMoviesGrid>
  );
};
