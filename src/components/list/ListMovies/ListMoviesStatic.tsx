'use client';

import type { Movie } from '@prisma/client';

import { MovieItem } from '@/components/movie/MovieItem';
import { ListMoviesGrid } from './ListMoviesGrid';
import { Observable } from '@/components/common/Observable';
import { useGetListMoviesInfinite } from '@/hooks/api/useGetListMoviesInfinite';

type ListMovieStaticProps = {
  listId: string;
  initialMovies: string;
  listCount: number;
};

export const ListMoviesStatic = ({ listId, initialMovies, listCount }: ListMovieStaticProps) => {
  const { data, size, setSize } = useGetListMoviesInfinite(listId, listCount - JSON.parse(initialMovies).length);

  const movies: Movie[] = JSON.parse(initialMovies)
    .concat(data?.flat().map((m) => m?.movie))
    .filter(Boolean);

  return (
    <ListMoviesGrid>
      {movies.map((movie, index) => (
        <MovieItem key={movie.id} movie={movie} index={index} />
      ))}
      <Observable onObserve={() => setSize(size + 1)} />
    </ListMoviesGrid>
  );
};
