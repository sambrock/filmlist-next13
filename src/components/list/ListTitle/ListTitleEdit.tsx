'use client';

import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { shallow } from 'zustand/shallow';
import { useDocumentTitle } from 'usehooks-ts';

import { DEFAULT_TITLE } from '@/constants';
import { useListStore } from '@/store/list/useListStore';
import { listTitleStyles } from './ListTitleStatic';

const dispatch = useListStore.getState().dispatch;

export const ListTitleEdit = ({ initialTitle }: { initialTitle: string }) => {
  const [title, setTitle] = useState(initialTitle);

  const titleRef = useRef<HTMLDivElement>(null);

  const storeTitle = useListStore((state) => state.data.list.title, shallow);
  useEffect(() => {
    setTitle(storeTitle);
    if (titleRef.current && document.activeElement !== titleRef.current) titleRef.current.innerText = storeTitle;
  }, [storeTitle]);
  useDocumentTitle(DEFAULT_TITLE(storeTitle || 'Untitled'));

  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLDivElement).innerText;

    setTitle(value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      dispatch({ type: 'SET_TITLE', payload: value });
    }, 250);
  };

  return (
    <div
      ref={titleRef}
      className={clsx(listTitleStyles, 'focus:outline-none', {
        'text-neutral-300 after:content-["Untitled"]': !title,
        'text-off-white': title,
      })}
      onInput={handleInput}
      onPaste={(e) => {
        // Remove formatting when pasting
        e.preventDefault();
        const text = e.clipboardData?.getData('text/plain');
        document.execCommand('insertHTML', false, text);
      }}
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      spellCheck={false}
      contentEditable={true}
      suppressContentEditableWarning={true}
    >
      {initialTitle}
    </div>
  );
};
