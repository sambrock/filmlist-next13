'use client';

import { useRef } from 'react';
import { clsx } from 'clsx';

import { useListStore } from '@/store/list/useListStore';
import { listTitleStyles } from './ListTitleStatic';

const dispatch = useListStore.getState().dispatch;

export const ListTitleEdit = ({ initialTitle }: { initialTitle: string }) => {
  const title = useListStore((state) => state.data.list?.title || '');

  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLDivElement).innerText;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      dispatch({ type: 'SET_TITLE', payload: value });
    }, 500);
  };

  return (
    <div
      className={clsx(listTitleStyles, 'focus:outline-none', {
        'text-white/30 after:content-["Untitled"]': !initialTitle && !title,
        'text-white-text': initialTitle || title,
      })}
      onInput={handleInput}
      contentEditable={true}
      spellCheck={false}
      suppressContentEditableWarning={true}
      suppressHydrationWarning={true}
    >
      {initialTitle}
    </div>
  );
};
