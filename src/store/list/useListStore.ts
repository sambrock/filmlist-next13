import { create } from 'zustand';
import { applyPatches, enableMapSet, enablePatches } from 'immer';

import { saveTransactions } from '@/api/transactionApi';
import type { ListStore } from './store.types';
import { listReducer } from './listReducer';

enablePatches();
enableMapSet();

export const useListStore = create<ListStore>((set) => ({
  _isInit: false,

  data: {
    id: '',
    name: '',
    title: '',
    description: '',
    movies: new Map(),
  },

  dispatch: (action) => set((state) => listReducer(state, action)),

  patches: [],
  inversePatches: [],

  undo: () =>
    set((state) => {
      const inversePatches = [...state.inversePatches];
      const patches = inversePatches.pop() || [];
      if (patches.length === 0) return state;
      return applyPatches({ ...state, inversePatches }, patches);
    }),
}));

useListStore.subscribe(async (state) => {
  console.log(state);
  console.log(state.patches, state.inversePatches);
  if (state.patches.length === 0) return;

  await saveTransactions(state.data.id, state.patches);
  useListStore.setState({ patches: [] });
});
