'use client';

import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useEventListener } from 'usehooks-ts';

import { Shortcut } from '../common/Shortcut';
import { searchPageAtom } from './MovieSearch';

export const disableLoadMoreAtom = atom(false);

export const MovieSearchHelper = ({ searchContainerRef }: { searchContainerRef: React.RefObject<HTMLDivElement> }) => {
  const disableLoadMore = useAtomValue(disableLoadMoreAtom);
  const setSearchPage = useSetAtom(searchPageAtom);

  const handleLoadMore = () => {
    if (disableLoadMore) return;
    setSearchPage((page) => page + 1);
  };

  useEventListener(
    'keydown',
    (e) => {
      if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleLoadMore();
      }
    },
    searchContainerRef
  );

  return (
    <div className="flex items-center border-t border-black-500 px-2 py-1">
      <button className="flex cursor-pointer" onClick={handleLoadMore}>
        <Shortcut>⌘L Load more</Shortcut>
      </button>

      <div className="ml-4 flex gap-4">
        <Shortcut>⏎ Add</Shortcut>
        {/* <Shortcut>⌘⏎ Add and close</Shortcut> */}
      </div>
    </div>
  );
};
