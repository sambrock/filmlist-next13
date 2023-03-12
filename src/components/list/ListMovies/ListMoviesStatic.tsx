'use client';

import type { Movie } from '@prisma/client';
import { atom, useAtomValue } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

import { MovieItem } from '@/components/movie/MovieItem';
import { ListMoviesGrid } from './ListMoviesGrid';

export const listMoviesAtom = atom<Movie[]>([]);

export const ListMoviesStatic = ({ initialMovies }: { initialMovies: string }) => {
  useHydrateAtoms([[listMoviesAtom, JSON.parse(initialMovies) as Movie[]]]);

  const movies = useAtomValue(listMoviesAtom);

  // Fixes hydration warning
  // should remove this and use a better solution
  if (typeof window === 'undefined')
    return (
      <ListMoviesGrid>
        {(JSON.parse(initialMovies) as Movie[]).map((movie, index) => (
          <MovieItem key={movie.id} movie={movie} index={index} />
        ))}
      </ListMoviesGrid>
    );

  return (
    <ListMoviesGrid>
      {movies.map((movie, index) => (
        <MovieItem key={movie.id} movie={movie} index={index} />
      ))}
    </ListMoviesGrid>
  );
};
