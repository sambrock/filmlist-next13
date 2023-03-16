'use client';

import type { Movie } from '@prisma/client';
import { useSsr } from 'usehooks-ts';

import { MovieItem } from '@/components/movie/MovieItem';
import { ListMoviesGrid } from './ListMoviesGrid';
import { Observable } from '@/components/common/Observable';
import { useGetListMoviesInfinite } from '@/hooks/api/useGetListMoviesInfinite';

export const ListMoviesStatic = ({ listId, initialMovies }: { listId: string; initialMovies: string }) => {
  const { isServer } = useSsr();

  const { data, size, setSize } = useGetListMoviesInfinite(listId);

  const movies: Movie[] = JSON.parse(initialMovies)
    .concat(data?.flat().map((m) => m?.movie))
    .filter(Boolean);

    // FIX:
    // SHouldn't load same page more than once
    // Stop loading if no more results
    // Show loading indicator (calculate expected results and show skeleton)
    // Can i use suspense?

  return (
    <ListMoviesGrid>
      {(isServer ? (JSON.parse(initialMovies) as Movie[]) : movies).map((movie, index) => (
        <MovieItem key={movie.id} movie={movie} index={index} />
      ))}
      <Observable onObserve={() => setSize(size + 1)} />
    </ListMoviesGrid>
  );
};
