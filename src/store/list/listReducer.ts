import { Draft, produce, produceWithPatches } from 'immer';

import type { ListStore } from './store.types';
import type { Action, ActionPayload } from './action.types';

const setTitle = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'SET_TITLE'>) => {
  draft.data.list.title = payload ?? '';
});

export const listReducer = (state: ListStore, action: Action): ListStore => {
  console.log(action);
  switch (action.type) {
    case 'SET_TITLE': {
      const [newState, patches, inversePatches] = setTitle(state, action.payload);
      return {
        ...newState,
        patches: [...state.patches, patches],
        inversePatches: [...state.inversePatches, inversePatches],
      };
    }
    default: {
      return state;
    }
  }
};
