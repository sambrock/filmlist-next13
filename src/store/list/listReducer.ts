import { Draft, produce, produceWithPatches, applyPatches as immerApplyPatches } from 'immer';

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
  // const order =
  //   draft.data.movies.size > 0 ? Math.max(...Array.from(draft.data.movies.values()).map((m) => m.order)) + 1 : 1;
  const order = draft._listMovieIds.size + 1;

  draft.data.movies.set(payload.id.toString(), {
    listId,
    movieId: payload.id,
    order: order,
    movie: payload,
    createdAt: new Date(),
    updatedAt: new Date(),
    _isFromInitialData: false,
  });

  draft._listMovieIds.add(payload.id);
});

const removeMovie = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'REMOVE_MOVIE'>) => {
  draft.data.movies.delete(payload);
  draft._listMovieIds.delete(Number(payload));
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

const deleteMoviesByIndex = produceWithPatches(
  (draft: Draft<ListStore>, payload: ActionPayload<'DELETE_MOVIES_BY_INDEX'>) => {
    const indexes = payload;
    const movieIds = Array.from(draft.data.movies.keys());
    const movieIdsToDelete = indexes.map((index) => movieIds[index]);
    movieIdsToDelete.forEach((id) => {
      draft.data.movies.delete(id);
      draft._listMovieIds.delete(Number(id));
    });
  }
);

const applyPatches = produce((draft: Draft<ListStore>, payload: ActionPayload<'APPLY_PATCHES'>) => {
  immerApplyPatches(draft, payload);
});

export const listReducer = (state: ListStore, action: Action): ListStore => {
  // console.log(action);
  switch (action.type) {
    case 'SET_TITLE': {
      const [newState, patches, inversePatches] = setTitle(state, action.payload);
      return {
        ...newState,
        _latestPatch: patches,
        _undoPointer: state._undoPointer + 1,
        _undoStack: state._undoStack.slice(0, state._undoPointer + 1).concat({ patches, inversePatches }),
      };
    }
    case 'SET_DESCRIPTION': {
      const [newState, patches, inversePatches] = setDescription(state, action.payload);
      return {
        ...newState,
        _latestPatch: patches,
        _undoPointer: state._undoPointer + 1,
        _undoStack: state._undoStack.slice(0, state._undoPointer + 1).concat({ patches, inversePatches }),
      };
    }
    case 'ADD_MOVIE': {
      const [newState, patches, inversePatches] = addMovie(state, action.payload);
      return {
        ...newState,
        _latestPatch: patches,
        _undoPointer: state._undoPointer + 1,
        _undoStack: state._undoStack.slice(0, state._undoPointer + 1).concat({ patches, inversePatches }),
      };
    }
    case 'REMOVE_MOVIE': {
      const [newState, patches, inversePatches] = removeMovie(state, action.payload);
      return {
        ...newState,
        _latestPatch: patches,
        _undoPointer: state._undoPointer + 1,
        _undoStack: state._undoStack.slice(0, state._undoPointer + 1).concat({ patches, inversePatches }),
      };
    }
    case 'ADD_MOVIES': {
      const newState = addListMovies(state, action.payload);
      return newState;
    }
    case 'APPLY_PATCHES': {
      const newState = applyPatches(state, action.payload);
      return newState;
    }
    case 'DELETE_MOVIES_BY_INDEX': {
      const [newState, patches, inversePatches] = deleteMoviesByIndex(state, action.payload);
      return {
        ...newState,
        _latestPatch: patches,
        _undoPointer: state._undoPointer + 1,
        _undoStack: state._undoStack.slice(0, state._undoPointer + 1).concat({ patches, inversePatches }),
      };
    }
    default: {
      return state;
    }
  }
};
