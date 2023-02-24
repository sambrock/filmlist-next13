import type { List, ListMovies, Movie } from '@prisma/client';
import type { Patch } from 'immer';
import type { Action } from './action.types';

export type ListStore = {
  data: {
    list: List;
    movies: Map<string, ListMovies & { movie: Movie }>;
  };

  dispatch: (action: Action) => void;

  patches: Patch[][];
  inversePatches: Patch[][];
};
