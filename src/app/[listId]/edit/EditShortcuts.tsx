'use client';

import { useSetAtom } from 'jotai';
import { useEventListener } from 'usehooks-ts';

import { searchIsActiveAtom } from '@/components/search/MovieSearch';

export const EditShortcuts = () => {
  const setIsSearchOpen = useSetAtom(searchIsActiveAtom);
  useEventListener('keydown', (e) => {
    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setIsSearchOpen(true);
    }
  });

  return null;
};
