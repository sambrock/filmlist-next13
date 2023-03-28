'use client';

import { useRef, useState } from 'react';
import { clsx } from 'clsx';

import { useListStore } from '@/store/list/useListStore';
import { listTitleStyles } from './ListTitleStatic';

const dispatch = useListStore.getState().dispatch;

export const ListTitleEdit = ({ initialTitle }: { initialTitle: string }) => {
  const [title, setTitle] = useState(initialTitle);

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
      className={clsx(listTitleStyles, 'focus:outline-none', {
        'text-neutral-300 after:content-["Untitled"]': !title,
        'text-off-white': title,
      })}
      onInput={handleInput}
      contentEditable={true}
      onPaste={(e) => {
        // Remove formatting when pasting
        e.preventDefault();
        const text = e.clipboardData?.getData('text/plain');
        document.execCommand('insertHTML', false, text);
      }}
      spellCheck={false}
      suppressContentEditableWarning={true}
    >
      {initialTitle}
    </div>
  );
};
