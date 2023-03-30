'use client';

import { useEffect, useRef } from 'react';
import { atom, useAtom, useSetAtom } from 'jotai';

import { Spinner } from '../common/Spinner';
import { useEventListener } from 'usehooks-ts';

export const isSavingAtom = atom(false);

export const useTriggerSearch = () => {
  const setIsSaving = useSetAtom(isSavingAtom);

  return {
    triggerSearch: () => setIsSaving(true),
  };
};

export const SaveIndicator = () => {
  const [isSaving, setIsSaving] = useAtom(isSavingAtom);

  // const cooldownRef = useRef(false);

  useEffect(() => {
    if (!isSaving) return;
    const timeout = setTimeout(() => setIsSaving(false), 750);

    return () => {
      clearTimeout(timeout);
    };
  }, [isSaving]);

  useEventListener('keydown', (e) => {
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setIsSaving(true);
    }
  });

  if (!isSaving) return null;
  return (
    <div className="mr-8 flex items-center gap-2 self-center text-sm font-medium text-white/40">
      <Spinner />
      <span className="mt-[3px]">Saving...</span>
    </div>
  );
};
