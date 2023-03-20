'use client';

import type { Movie } from '@prisma/client';

import { ListMoviesGrid } from './ListMoviesGrid';
import { Observable } from '@/components/common/Observable';
import { useGetListMoviesInfinite } from '@/hooks/api/useGetListMoviesInfinite';
import { MovieItemStatic } from '@/components/movie/MovieItemStatic/MovieItemStatic';

type ListMovieStaticProps = {
  listId: string;
  initialMovies: string;
  listCount: number;
};

export const ListMoviesStatic = ({ listId, initialMovies, listCount }: ListMovieStaticProps) => {
  const { data, size, setSize, hasMore } = useGetListMoviesInfinite(
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
      <Observable
        onObserve={() => {
          if (!hasMore) return;
          setSize(size + 1);
        }}
      />
    </ListMoviesGrid>
  );
};
