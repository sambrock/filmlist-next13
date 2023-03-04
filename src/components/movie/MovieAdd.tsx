'use client';

import { PlusOutlined } from '@ant-design/icons';
import { useSetAtom } from 'jotai';
import { searchIsActiveAtom } from '../search/MovieSearch';

export const MovieAdd = () => {
  const setSearchIsActive = useSetAtom(searchIsActiveAtom);

  return (
    <div
      className="flex aspect-poster cursor-pointer items-center justify-center rounded-md bg-black-700 outline-none transition-all"
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
      <PlusOutlined className="text-4xl text-black-100" />
    </div>
  );
};
