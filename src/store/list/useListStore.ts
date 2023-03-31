import { create } from 'zustand';
import { enableMapSet, enablePatches, Patch } from 'immer';

import type { ListStore } from './store.types';
import { listReducer } from './listReducer';
import { api } from '@/api';

enablePatches();
enableMapSet();

export const useListStore = create<ListStore>((set) => ({
  data: {
    list: {
      id: '',
      userId: '',
      title: '',
      description: '',
      token: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    movies: new Map(),
  },

  _listMovieIds: new Set([]),

  dispatch: (action) => set((state) => listReducer(state, action)),

  _latestPatch: [],

  _undoStack: [],
  _undoPointer: -1,
}));

useListStore.subscribe(async (state) => {
  if (state._latestPatch.length === 0) return;
  useListStore.setState({ _latestPatch: [] });

  const filteredPatches = filterPatches(state._latestPatch);
  if (filteredPatches.length === 0) return;

  api.post('/api/v1/saveTransactions', {
    listId: state.data.list.id,
    transactions: filteredPatches,
  });
});

export const handleUndo = () => {
  const { _undoStack, _undoPointer, data } = useListStore.getState();
  if (_undoPointer < 0) return;
  const patches = _undoStack[_undoPointer].inversePatches;
  useListStore.getState().dispatch({ type: 'APPLY_PATCHES', payload: patches });
  useListStore.setState({ _undoPointer: _undoPointer - 1 });

  const filteredPatches = filterPatches(patches);
  if (filteredPatches.length === 0) return;

  api.post('/api/v1/saveTransactions', {
    listId: data.list.id,
    transactions: filteredPatches,
  });
};

export const handleRedo = () => {
  const { _undoStack, _undoPointer, data } = useListStore.getState();
  if (_undoPointer >= _undoStack.length - 1) return;
  const patches = _undoStack[_undoPointer + 1].patches;
  useListStore.getState().dispatch({ type: 'APPLY_PATCHES', payload: patches });
  useListStore.setState({ _undoPointer: _undoPointer + 1 });

  const filteredPatches = filterPatches(patches);
  if (filteredPatches.length === 0) return;

  api.post('/api/v1/saveTransactions', {
    listId: data.list.id,
    transactions: filteredPatches,
  });
};

// Don't save patches that start with an underscore
const filterPatches = (patches: Patch[]) =>
  patches.filter(
    (patch) =>
      !(patch.path[0] as string)?.startsWith('_') &&
      !(patch.path[1] as string)?.startsWith('_') &&
      !(patch.path[2] as string)?.startsWith('_')
  );
