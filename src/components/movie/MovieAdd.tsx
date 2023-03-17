'use client';

import { PlusOutlined } from '@ant-design/icons';
import { useSetAtom } from 'jotai';

import { searchIsActiveAtom } from '../search/MovieSearch';

export const MovieAdd = () => {
  const setSearchIsActive = useSetAtom(searchIsActiveAtom);

  return (
    <div
      className="relative flex aspect-poster cursor-pointer flex-col items-center justify-center gap-4 rounded-md bg-black-700 outline-none transition-all"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setSearchIsActive(true);
        }
      }}
      onClick={() => {
        setSearchIsActive(true);
      }}
    >
      <PlusOutlined className="text-4xl text-black-100 mix-blend-lighten" />

      <span className="absolute left-1/2 bottom-4 mt-auto -translate-x-1/2 self-start text-xs font-medium text-white/40">
        ⌘K Add a film
      </span>
    </div>
  );
};
