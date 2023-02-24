import type { Movie } from '@prisma/client';

export type ActionType = 'INITIALIZE' | 'SET_TITLE' | 'ADD_MOVIE';

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

export type Action = SetTitleAction | AddMovieAction;

export type ActionPayload<T extends ActionType> = Extract<Action, { type: T }>['payload'];
