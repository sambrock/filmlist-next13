import { Draft, produce, produceWithPatches } from 'immer';
import { v4 as uuidv4 } from 'uuid';

import type { ListStore } from './store.types';
import type { Action, ActionPayload } from './action.types';

const initializeList = produce((draft: Draft<ListStore>, payload: ActionPayload<'INITIALIZE'>) => {
  draft._isInit = true;
  draft.data = {
    ...payload.list,
    movies: new Map(
      payload.movies?.map((m) => [
        m.id,
        {
          _isInitial: true,
          id: m.id,
          listId: m.listId,
          movieId: m.movieId,
          order: m.order,
          data: m.movie,
        },
      ])
    ),
  };
});

const setTitle = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'SET_TITLE'>) => {
  draft.data.title = payload;
});

const setDescription = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'SET_DESCRIPTION'>) => {
  draft.data.description = payload;
});

const addMovie = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'ADD_MOVIE'>) => {
  const id = uuidv4();

  draft.data.movies.set(id, {
    _isInitial: false,
    id,
    listId: draft.data.id,
    movieId: payload.movie.id,
    order: [...draft.data.movies].length + 1,
    data: {
      id: payload.movie.id,
      title: payload.movie.title,
      originalTitle: payload.movie.original_title,
      originalLanguage: payload.movie.original_language,
      overview: payload.movie.overview,
      posterPath: payload.movie.poster_path,
      backdropPath: payload.movie.backdrop_path,
      releaseDate: new Date(payload.movie.release_date),
    },
  });
});

const removeMovie = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'REMOVE_MOVIE'>) => {
  draft.data.movies.forEach((m) => {
    if (m.order > (draft.data.movies.get(payload)?.order as number)) {
      m.order = m.order - 1;
    }
  });

  draft.data.movies.delete(payload);
});

const setOrder = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'SET_ORDER_PATCHES'>) => {
  // draft.data.movies.delete(payload._id);
  // const index = draft.data.movies.findIndex((m) => m._id === payload._id);
  // for (let i = 0; i < draft.data.movies.length; i++) {
  //   if (i !== index) {
  //     if (draft.data.movies[i].order > draft.data.movies[index].order && draft.data.movies[i].order <= payload.order) {
  //       draft.data.movies[i].order--;
  //     }
  //     if (draft.data.movies[i].order < draft.data.movies[index].order && draft.data.movies[i].order >= payload.order) {
  //       draft.data.movies[i].order++;
  //     }
  //   }
  // }
  // draft.data.movies[index].order = payload.order;
});

export const listReducer = (state: ListStore, action: Action): ListStore => {
  console.log(action);
  switch (action.type) {
    case 'INITIALIZE': {
      return initializeList(state, action.payload);
    }
    case 'SET_TITLE': {
      const [newState, patches, inversePatches] = setTitle(state, action.payload);
      return {
        ...newState,
        patches: [...state.patches, patches],
        inversePatches: [...state.inversePatches, inversePatches],
      };
    }
    case 'SET_DESCRIPTION': {
      const [newState, patches, inversePatches] = setDescription(state, action.payload);
      return {
        ...newState,
        patches: [...state.patches, patches],
        inversePatches: [...state.inversePatches, inversePatches],
      };
    }
    case 'ADD_MOVIE': {
      const [newState, patches, inversePatches] = addMovie(state, action.payload);
      return {
        ...newState,
        patches: [...state.patches, patches],
        inversePatches: [...state.inversePatches, inversePatches],
      };
    }
    case 'REMOVE_MOVIE': {
      const [newState, patches, inversePatches] = removeMovie(state, action.payload);
      console.log(newState);
      return {
        ...newState,
        patches: [...state.patches, patches],
        inversePatches: [...state.inversePatches, inversePatches],
      };
    }
    case 'SET_ORDER': {
      const [newState, patches, inversePatches] = setOrder(state, action.payload);
      return newState;
    }
    default: {
      return state;
    }
  }
};
