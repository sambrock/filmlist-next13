'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { useListStore } from '@/store/list/useListStore';
import { MAX_DESCRIPTION_LENGTH, MAX_DESCRIPTION_PREVIEW_LENGTH } from '@/constants';
import { isListDescriptionShowMoreAtom, ListDescriptionStatic } from './ListDescriptionStatic';
import { KeyboardShortcut } from '@/components/common/KeyboardShortcut';

export const isEditingListDescriptionAtom = atom(false);

const dispatch = useListStore.getState().dispatch;

export const ListDescriptionEdit = ({ initialDescription }: { initialDescription: string }) => {
  const [description, setDescription] = useState(initialDescription);
  const [isEditingListDescription, setIsEditingListDescription] = useAtom(isEditingListDescriptionAtom);

  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(
    containerRef,
    () => {
      if (window.getSelection()?.toString()) return;
      setIsEditingListDescription(false);
    },
    'mouseup'
  );

  useEventListener(
    'keydown',
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsEditingListDescription(false);
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) setIsEditingListDescription(false);
    },
    containerRef
  );

  return (
    <div ref={containerRef}>
      {!isEditingListDescription && <ListDescriptionEditStatic description={description} />}
      {isEditingListDescription && <ListDescriptionEditing description={description} setDescription={setDescription} />}
    </div>
  );
};

const ListDescriptionEditStatic = ({ description }: { description: string }) => {
  const setIsEditingListDescription = useSetAtom(isEditingListDescriptionAtom);

  return <ListDescriptionStatic onClick={() => setIsEditingListDescription(true)} description={description} />;
};

const ListDescriptionEditing = ({
  description,
  setDescription,
}: {
  description: string;
  setDescription: (description: string) => void;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTextAreaSize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  useLayoutEffect(() => {
    if (textAreaRef.current) {
      handleTextAreaSize({ target: textAreaRef.current } as React.ChangeEvent<HTMLTextAreaElement>);
    }
  }, []);

  const setIsShowMore = useSetAtom(isListDescriptionShowMoreAtom);

  return (
    <div className="rounded-md bg-neutral-700">
      <textarea
        ref={textAreaRef}
        className="w-full resize-none rounded bg-transparent py-3 px-2 text-base text-white/60 outline-none"
        autoFocus={true}
        value={description || ''}
        spellCheck={false}
        onChange={(e) => {
          setDescription(e.target.value);
          handleTextAreaSize(e);

          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value });
            if (e.target.value.length < MAX_DESCRIPTION_PREVIEW_LENGTH) setIsShowMore(false);
          }, 500);
        }}
        maxLength={MAX_DESCRIPTION_LENGTH}
      />
      <div className="flex items-center gap-4 border-t border-neutral-600 px-2 py-1">
        <button className="flex cursor-pointer">
          <KeyboardShortcut keys={['⌘', '⏎']} label="Save" />
        </button>
        <span className="text-xs font-medium text-white/40">HTML + Markdown supported</span>
      </div>
    </div>
  );
};
