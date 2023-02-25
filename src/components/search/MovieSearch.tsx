'use client';

import { useRef } from 'react';
import { atom, useSetAtom } from 'jotai';
import { PlusOutlined } from '@ant-design/icons';

import { MovieSearchResults } from './MovieSearchResults';

export const searchQueryAtom = atom('');

export const MovieSearch = () => {
  const setSearchQuery = useSetAtom(searchQueryAtom);

  const timeoutRef = useRef<NodeJS.Timeout>();

  return (
    <div className="relative mx-2 min-h-[38px]">
      <div className="absolute top-0 left-0 w-full rounded bg-black-700 px-2 shadow-2xl shadow-black-900 ">
        <div className="flex items-center gap-2 py-1">
          <PlusOutlined className="text-lg font-bold text-white/40" />
          <input
            type="text"
            className="mt-0.5 w-full bg-transparent text-sm leading-7 placeholder:text-white/40 focus:outline-none"
            placeholder="Add a film"
            onChange={(e) => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              timeoutRef.current = setTimeout(() => {
                console.log('setting');
                setSearchQuery(e.target.value);
              }, 350);
            }}
          />
        </div>
        <MovieSearchResults />
      </div>
    </div>
  );
};
