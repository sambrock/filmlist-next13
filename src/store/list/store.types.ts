import type { List as PrismaList, ListMovie as PrismaListMovie, Movie as PrismaMovie } from '@prisma/client';
import type { Patch } from 'immer';
import type { Action } from './action.types';

export type ListStoreMovie = {
  _isInitial: boolean;
  data: PrismaMovie;
} & PrismaListMovie;

export interface ListStore {
  _isInit: boolean;

  data: Omit<PrismaList, 'createdAt'> & {
    movies: Map<string, ListStoreMovie>;
  };

  undo: () => void;

  patches: Patch[][];
  inversePatches: Patch[][];

  dispatch: (action: Action) => void;
}
