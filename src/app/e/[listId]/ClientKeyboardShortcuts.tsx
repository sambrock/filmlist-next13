'use client';

import { useEventListener } from 'usehooks-ts';

import { handleRedo, handleUndo } from '@/store/list/useListStore';

export const ClientKeyboardShortcuts = () => {
  useEventListener('keydown', (e) => {
    if (e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
      e.preventDefault();
      handleUndo();
    }

    if (e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey) {
      e.preventDefault();
      handleRedo();
    }
  });

  return null;
};
