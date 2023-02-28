'use client';

import { Fragment, useRef } from 'react';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { PlusOutlined } from '@ant-design/icons';
import { clsx } from 'clsx';

import { MovieSearchResults } from './MovieSearchResults';

export const searchQueryAtom = atom('', (get, set, value: string) => {
  set(searchQueryAtom, value);
  set(isSearchActiveAtom, value !== '');
});
export const isSearchActiveAtom = atom(false);

export const MovieSearch = () => {
  const setSearchQuery = useSetAtom(searchQueryAtom);
  const isSearchActive = useAtomValue(isSearchActiveAtom);

  const timeoutRef = useRef<NodeJS.Timeout>();

  return (
    <Fragment>
      <div
        className={clsx('flex items-center gap-2 border-black-500 bg-black-700 px-2', {
          'rounded-lg border': !isSearchActive,
          'rounded-t-lg border-x border-t': isSearchActive,
        })}
      >
        <PlusOutlined className="text-lg font-bold text-white/60" />
        <input
          type="text"
          className="mt-0.5 w-full bg-transparent text-sm leading-9 text-white-text placeholder:text-white/60 focus:outline-none"
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
      <MovieSearchResults />
    </Fragment>
  );
};
