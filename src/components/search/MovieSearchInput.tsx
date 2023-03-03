'use client';

import { forwardRef, useRef } from 'react';
import { clsx } from 'clsx';
import { useSetAtom } from 'jotai';
import { PlusOutlined } from '@ant-design/icons';

import { searchQueryAtom } from './MovieSearch';

export const MovieSearchInput = forwardRef<HTMLInputElement, React.ComponentProps<'input'>>((props, ref) => {
  const setSearchQuery = useSetAtom(searchQueryAtom);

  const timeoutRef = useRef<NodeJS.Timeout>();

  return (
    <div className={clsx('flex items-center gap-2 px-2')}>
      <PlusOutlined className="text-lg font-bold text-white/40" />
      <input
        {...props}
        ref={ref}
        type="text"
        className="mt-1 w-full bg-transparent py-2 text-sm text-white-text placeholder:text-white/60 focus:outline-none"
        placeholder="Add a film"
        spellCheck={false}
        onChange={(e) => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setSearchQuery(e.target.value);
          }, 350);
        }}
      />
    </div>
  );
});
