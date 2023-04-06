'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { useSetAtom } from 'jotai';
import { PlusOutlined } from '@ant-design/icons';

import { searchQueryAtom } from './MovieSearch';
import { KeyboardShortcut } from '../common/KeyboardShortcut';

type MovieSearchInputProps = { isSearchActive: boolean; isHover: boolean } & React.ComponentProps<'input'>;

export const MovieSearchInput = forwardRef<HTMLInputElement, MovieSearchInputProps>(
  ({ isSearchActive, isHover, ...props }, ref) => {
    const setSearchQuery = useSetAtom(searchQueryAtom);

    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
      if (isSearchActive) {
        // TODO: Fix this ts-ignore
        // @ts-ignore
        ref.current?.focus();
      }
    }, [isSearchActive]);

    return (
      <div className={clsx('flex items-center gap-2 px-2 transition-colors')}>
        <PlusOutlined className="text-lg font-bold text-white/40" />
        <input
          {...props}
          ref={ref}
          type="text"
          className="mt-0.5 w-full bg-transparent py-1.5 text-sm text-off-white placeholder:font-medium placeholder:text-white/40 focus:outline-none"
          autoFocus={isSearchActive && true}
          placeholder="Add a film"
          spellCheck={false}
          onChange={(e) => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              setSearchQuery(e.target.value);
            }, 350);
          }}
        />
        <KeyboardShortcut defaultKeys={['Ctrl', 'K']} macosKeys={['⌘', 'K']} />
      </div>
    );
  }
);
