import type { ListMovies, Movie } from '@prisma/client';

export type ActionType = 'INITIALIZE' | 'SET_TITLE' | 'ADD_MOVIE' | 'REMOVE_MOVIE' | 'ADD_MOVIES';

interface BaseAction<T extends ActionType> {
  type: T;
  payload?: unknown;
}

export interface SetTitleAction extends BaseAction<'SET_TITLE'> {
  payload: string | null;
}

export interface AddMovieAction extends BaseAction<'ADD_MOVIE'> {
  payload: Movie;
}

export interface DeleteMovieAction extends BaseAction<'REMOVE_MOVIE'> {
  payload: string;
}

export interface AddListMovies extends BaseAction<'ADD_MOVIES'> {
  payload: (ListMovies & { movie: Movie })[];
}

export type Action = SetTitleAction | AddMovieAction | DeleteMovieAction | AddListMovies;

export type ActionPayload<T extends ActionType> = Extract<Action, { type: T }>['payload'];
