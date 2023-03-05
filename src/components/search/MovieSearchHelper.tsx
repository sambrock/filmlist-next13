'use client';

import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useEventListener } from 'usehooks-ts';

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
      <button
        className="cursor-pointer text-xs font-medium text-white/40 outline-none hover:text-white/60"
        onClick={handleLoadMore}
      >
        ⌘L Load more
      </button>

      <div className="ml-4 flex gap-4">
        <span className="text-xs font-medium text-white/40">⏎ Add</span>
        <span className="text-xs font-medium text-white/40">⌘⏎ Add and close</span>
        {/* <span className="text-xs font-medium text-white/40">⌘⏎ Add and close</span> */}
      </div>
    </div>
  );
};
