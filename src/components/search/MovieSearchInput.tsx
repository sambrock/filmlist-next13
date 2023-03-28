'use client';

import { forwardRef, useRef } from 'react';
import { clsx } from 'clsx';
import { useSetAtom } from 'jotai';
import { PlusOutlined } from '@ant-design/icons';

import { searchQueryAtom } from './MovieSearch';
import { KeyboardShortcut } from '../common/KeyboardShortcut';

export const MovieSearchInput = forwardRef<
  HTMLInputElement,
  { isSearchActive: boolean; isHover: boolean } & React.ComponentProps<'input'>
>(({ isSearchActive, isHover, ...props }, ref) => {
  const setSearchQuery = useSetAtom(searchQueryAtom);

  const timeoutRef = useRef<NodeJS.Timeout>();

  return (
    <div
      className={clsx('flex items-center gap-2 px-2 transition-colors', {
        'rounded-md border border-neutral-600': isHover && !isSearchActive,
        'rounded-md border border-neutral-700': !isHover && !isSearchActive,
        'rounded-t-md border-x border-t border-neutral-600': isSearchActive,
      })}
    >
      <PlusOutlined className="text-lg font-bold text-white/40" />
      <input
        {...props}
        ref={ref}
        type="text"
        className="mt-0.5 w-full bg-transparent py-1.5 text-sm text-off-white placeholder:font-medium placeholder:text-white/40 focus:outline-none"
        placeholder="Add a film"
        spellCheck={false}
        onChange={(e) => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setSearchQuery(e.target.value);
          }, 350);
        }}
      />
      <KeyboardShortcut keys={['⌘K']} />
    </div>
  );
});
