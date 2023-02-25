import { Draft, produce, produceWithPatches } from 'immer';

import type { ListStore } from './store.types';
import type { Action, ActionPayload } from './action.types';

const setTitle = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'SET_TITLE'>) => {
  draft.data.list.title = payload ?? '';
});

const addMovie = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'ADD_MOVIE'>) => {
  const listId = draft.data.list.id;
  draft.data.movies.set(payload.id.toString(), {
    listId,
    movieId: payload.id,
    order: draft.data.movies.size,
    movie: payload,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
});

const removeMovie = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'REMOVE_MOVIE'>) => {
  draft.data.movies.delete(payload);
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
    default: {
      return state;
    }
  }
};
