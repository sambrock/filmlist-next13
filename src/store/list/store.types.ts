import type { List, ListMovies, Movie } from '@prisma/client';
import type { Patch } from 'immer';
import type { Action } from './action.types';

export type ListStore = {
  data: {
    list: List;
    movies: Map<
      string,
      ListMovies & {
        _isFromInitialData: boolean;
        movie: Movie;
      }
    >;
  };

  _listMovieIds: number[];

  dispatch: (action: Action) => void;

  patches: Patch[][];
  inversePatches: Patch[][];
};
