'use client';

import { useRef, useState } from 'react';
import { clsx } from 'clsx';

import { useListStore } from '@/store/list/useListStore';

const dispatch = useListStore.getState().dispatch;

export const ListTitle = () => {
  const [isEmpty, setIsEmpty] = useState(true);

  const defaultTitle = useListStore((state) => state.data.list.title);

  const titleRef = useRef<string>(defaultTitle);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLDivElement).innerText;

    if (value.length === 0) setIsEmpty(true);
    else setIsEmpty(false);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      dispatch({ type: 'SET_TITLE', payload: value });
      titleRef.current = value;
    }, 500);
  };

  return (
    <div
      className={clsx('text-4xl font-bold focus:outline-none', {
        'text-white/30 after:content-["Untitled"]': !defaultTitle && isEmpty,
        'text-white': defaultTitle || !isEmpty,
      })}
      contentEditable={true}
      spellCheck={false}
      defaultValue={titleRef.current}
      onInput={handleInput}
    />
  );
};
