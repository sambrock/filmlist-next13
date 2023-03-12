'use client';

import { useLayoutEffect, useRef } from 'react';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { shallow } from 'zustand/shallow';
import { clsx } from 'clsx';

import { useListStore } from '@/store/list/useListStore';
import { Shortcut } from '@/components/common/Shortcut';
import { parseMarkdown } from '@/utils/parseMarkdown';
import { useShowMore } from './hooks/useShowMore';
import { MAX_DESCRIPTION_LENGTH, MAX_DESCRIPTION_PREVIEW_LENGTH } from '@/utils/constants';

export const isEditingListDescriptionAtom = atom(false);
export const isListDescriptionShowMoreAtom = atom(false);

const dispatch = useListStore.getState().dispatch;

export const ListDescriptionEdit = ({ initialDescription }: { initialDescription: string }) => {
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
      {!isEditingListDescription && <ListDescriptionEditStatic initialDescription={initialDescription} />}
      {isEditingListDescription && <ListDescriptionEditing initialDescription={initialDescription} />}
    </div>
  );
};

const ListDescriptionShowMore = () => {
  const [isShowMore, setIsShowMore] = useAtom(isListDescriptionShowMoreAtom);

  return (
    <span className="ml-2">
      <button
        className="text-sm font-medium text-white/60 hover:text-white/80"
        onClick={(e) => {
          e.stopPropagation();
          setIsShowMore(!isShowMore);
        }}
      >
        {isShowMore ? 'Show less' : 'Show more'}
      </button>
    </span>
  );
};

const ListDescriptionEditStatic = ({ initialDescription }: { initialDescription: string }) => {
  const description = useListStore((state) => state.data.list.description, shallow);

  const setIsEditingListDescription = useSetAtom(isEditingListDescriptionAtom);

  const isShowMore = useAtomValue(isListDescriptionShowMoreAtom);
  const { enableShowMore, text } = useShowMore(description || initialDescription);

  return (
    <div onClick={() => setIsEditingListDescription(true)}>
      <div
        className={clsx(
          'inline whitespace-pre-wrap font-serif text-white/60 [&>ol]:ml-4 [&>ol]:list-decimal [&>ol]:pl-4 [&>ul]:ml-4 [&>ul]:list-disc [&>ul]:pl-4',
          {
            'max-h-48 overflow-clip': !isShowMore,
          }
        )}
        suppressHydrationWarning={true}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(text) || text }}
      />
      {enableShowMore() && <ListDescriptionShowMore />}
    </div>
  );
};

const ListDescriptionEditing = ({ initialDescription }: { initialDescription: string }) => {
  const description = useListStore((state) => state.data.list.description, shallow);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const valueRef = useRef(description ? description : initialDescription);

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
    <div className="rounded bg-black-700">
      <textarea
        ref={textAreaRef}
        className="w-full resize-none rounded bg-transparent py-3 px-2 text-base text-white/60 outline-none"
        autoFocus={true}
        defaultValue={valueRef.current}
        spellCheck={false}
        onChange={(e) => {
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
      <div className="flex items-center gap-4 border-t border-black-500 px-2 py-1">
        <button className="flex cursor-pointer">
          <Shortcut>⏎ Save</Shortcut>
        </button>
        <Shortcut>HTML + Markdown supported</Shortcut>
      </div>
    </div>
  );
};
