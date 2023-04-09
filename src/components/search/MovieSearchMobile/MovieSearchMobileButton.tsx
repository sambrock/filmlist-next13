'use client';

import { PlusOutlined } from '@ant-design/icons';
import { useSetAtom } from 'jotai';

import { isMovieSearchMobileActiveAtom } from './MovieSearchMobile';

export const MovieSearchMobileButton = () => {
  const setIsMovieSearchMobileActive = useSetAtom(isMovieSearchMobileActiveAtom);

  return (
    <button
      className="bg-neutral-800-blur flex w-full font-medium items-center gap-1 rounded px-2 py-[1px] text-sm text-white/40 text-off-white placeholder:text-white/40 focus:outline-none"
      onClick={() => setIsMovieSearchMobileActive(true)}
    >
      <PlusOutlined className="text-lg" />
      <span className="mt-[3px]">Add a film</span>
    </button>
  );
};
