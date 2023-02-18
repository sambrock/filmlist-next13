import type { List as PrismaList, ListMovie as PrismaListMovie, Movie as PrismaMovie } from '@prisma/client';
import type { GetMoviesSearch } from '@/pages/api/movies/search';

export type ActionType =
  | 'INITIALIZE'
  | 'SET_TITLE'
  | 'SET_DESCRIPTION'
  | 'REMOVE_DESCRIPTION'
  | 'ADD_MOVIE'
  | 'REMOVE_MOVIE'
  | 'SET_ORDER_PATCHES'
  | 'SET_ORDER';

interface BaseAction<T extends ActionType> {
  type: T;
  payload?: unknown;
}

export interface InitializeAction extends BaseAction<'INITIALIZE'> {
  payload: {
    list: PrismaList;
    movies?: ({ movie: PrismaMovie } & PrismaListMovie)[];
  };
}

export interface SetTitleAction extends BaseAction<'SET_TITLE'> {
  payload: string | null;
}

export interface SetDescriptionAction extends BaseAction<'SET_DESCRIPTION'> {
  payload: string;
}

export interface AddMovieAction extends BaseAction<'ADD_MOVIE'> {
  payload: {
    // id: string;
    movie: GetMoviesSearch[number];
  };
}

export interface RemoveMovieAction extends BaseAction<'REMOVE_MOVIE'> {
  payload: string;
}

export interface SetOrderPatchesAction extends BaseAction<'SET_ORDER_PATCHES'> {
  payload: {
    _id: string;
    order: number;
  };
}

export interface SetOrderAction extends BaseAction<'SET_ORDER'> {
  payload: {
    _id: string;
    order: number;
  };
}

export type Action =
  | InitializeAction
  | SetTitleAction
  | SetDescriptionAction
  | AddMovieAction
  | RemoveMovieAction
  | SetOrderPatchesAction
  | SetOrderAction;

export type ActionPayload<T extends ActionType> = Extract<Action, { type: T }>['payload'];
