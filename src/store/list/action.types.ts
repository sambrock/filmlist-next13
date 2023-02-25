import type { Movie } from '@prisma/client';

export type ActionType = 'INITIALIZE' | 'SET_TITLE' | 'ADD_MOVIE' | 'REMOVE_MOVIE';

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

export type Action = SetTitleAction | AddMovieAction | DeleteMovieAction;

export type ActionPayload<T extends ActionType> = Extract<Action, { type: T }>['payload'];
