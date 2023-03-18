import { Draft, produce, produceWithPatches } from 'immer';

import type { ListStore } from './store.types';
import type { Action, ActionPayload } from './action.types';

const setTitle = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'SET_TITLE'>) => {
  draft.data.list.title = payload ?? '';
});

const setDescription = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'SET_DESCRIPTION'>) => {
  draft.data.list.description = payload;
});

const addMovie = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'ADD_MOVIE'>) => {
  const listId = draft.data.list.id;
  const order =
    draft.data.movies.size > 0 ? Math.max(...Array.from(draft.data.movies.values()).map((m) => m.order)) + 1 : 1;

  draft.data.movies.set(payload.id.toString(), {
    listId,
    movieId: payload.id,
    order: order,
    movie: payload,
    createdAt: new Date(),
    updatedAt: new Date(),
    _isFromInitialData: false,
  });

  draft._listMovieIds.push(payload.id);
});

const removeMovie = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'REMOVE_MOVIE'>) => {
  draft.data.movies.delete(payload);
  draft._listMovieIds = draft._listMovieIds.filter((id) => id.toString() !== payload);
});

const addListMovies = produce((draft: Draft<ListStore>, payload: ActionPayload<'ADD_MOVIES'>) => {
  payload.forEach((listMovie) =>
    draft.data.movies.set(listMovie.movieId.toString(), {
      ...listMovie,
      movie: listMovie.movie,
      _isFromInitialData: true,
    })
  );
});

export const listReducer = (state: ListStore, action: Action): ListStore => {
  console.log(action);
  switch (action.type) {
    case 'SET_TITLE': {
      const [newState, patches, inversePatches] = setTitle(state, action.payload);
      return {
        ...newState,
        patches: [patches, ...state.patches],
        inversePatches: [inversePatches, ...state.inversePatches],
      };
    }
    case 'SET_DESCRIPTION': {
      const [newState, patches, inversePatches] = setDescription(state, action.payload);
      return {
        ...newState,
        patches: [patches, ...state.patches],
        inversePatches: [inversePatches, ...state.inversePatches],
      };
    }
    case 'ADD_MOVIE': {
      const [newState, patches, inversePatches] = addMovie(state, action.payload);
      return {
        ...newState,
        patches: [patches, ...state.patches],
        inversePatches: [inversePatches, ...state.inversePatches],
      };
    }
    case 'REMOVE_MOVIE': {
      const [newState, patches, inversePatches] = removeMovie(state, action.payload);
      return {
        ...newState,
        patches: [patches, ...state.patches],
        inversePatches: [inversePatches, ...state.inversePatches],
      };
    }
    case 'ADD_MOVIES': {
      const newState = addListMovies(state, action.payload);
      return newState;
    }
    default: {
      return state;
    }
  }
};
