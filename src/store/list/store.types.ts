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

// export type ListStoreMovie = {
//   _isInitial: boolean;
//   data: PrismaMovie;
// } & PrismaListMovie;

// export interface ListStore {
//   _isInit: boolean;

//   data: Omit<PrismaList, 'createdAt'> & {
//     movies: Map<string, ListStoreMovie>;
//   };

//   undo: () => void;

//   patches: Patch[][];
//   inversePatches: Patch[][];

//   dispatch: (action: Action) => void;
// }
