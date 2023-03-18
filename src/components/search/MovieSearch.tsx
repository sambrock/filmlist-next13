'use client';

import { useEffect, useRef } from 'react';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { clsx } from 'clsx';
import { shallow } from 'zustand/shallow';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { useListKeyboardNavigate } from '@/hooks/useListKeyboardNavigate';
import { MovieSearchInput } from './MovieSearchInput';
import { useListStore } from '@/store/list/useListStore';
import { MovieSearchResultsList, MovieSearchResultsListItem } from './MovieSearchResultsList';
import { Badge } from '../common/Badge';
import { disableLoadMoreAtom, MovieSearchHelper } from './MovieSearchHelper';
import { useSearchMovies } from '@/hooks/api/useSearchMovies';

export const searchIsActiveAtom = atom(false);
export const searchQueryAtom = atom('', (get, set, value: string) => {
  set(searchQueryAtom, value);
  set(searchPageAtom, 1);
});
export const searchPageAtom = atom(1);

const dispatch = useListStore.getState().dispatch;

export const MovieSearch = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchIsActive, setSearchIsActive] = useAtom(searchIsActiveAtom);

  useEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Escape') {
        setSearchIsActive(false);
      }
    },
    searchContainerRef
  );

  useEventListener('keydown', (e) => {
    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setSearchIsActive(true);
      inputRef.current?.focus();
    }
  });

  useOnClickOutside(
    searchContainerRef,
    () => {
      if (window.getSelection()?.toString()) return;
      setSearchIsActive(false);
    },
    'mouseup'
  );

  return (
    <div
      ref={searchContainerRef}
      tabIndex={0}
      className={clsx('relative bg-black-700 outline-none', {
        'rounded-md': !searchIsActive,
        'rounded-t-md shadow-lg shadow-black/60': searchIsActive,
      })}
    >
      <MovieSearchInput ref={inputRef} onFocus={() => setSearchIsActive(true)} />
      {searchIsActive && (
        <div className="absolute w-full rounded-b-md bg-black-700 shadow-lg shadow-black/60">
          <MovieSearchResults searchContainerRef={searchContainerRef} inputRef={inputRef} />
          <MovieSearchHelper searchContainerRef={searchContainerRef} />
        </div>
      )}
    </div>
  );
};

const MovieSearchResults = ({
  searchContainerRef,
  inputRef,
}: {
  searchContainerRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
}) => {
  const movieIds = useListStore((state) => state._listMovieIds, shallow);

  const q = useAtomValue(searchQueryAtom);
  const page = useAtomValue(searchPageAtom);
  const setDisableLoadMore = useSetAtom(disableLoadMoreAtom);

  const { data } = useSearchMovies({ q, page: page.toString() }, (hasMore) => setDisableLoadMore(!hasMore));

  const handleSelect = (index: number) => {
    if (!data || data.length === 0) return;
    if (movieIds.includes(data?.[index]?.id)) return;
    const payload = data?.[index];
    dispatch({
      type: 'ADD_MOVIE',
      payload: {
        id: payload.id,
        title: payload.title,
        posterPath: payload.posterPath,
        releaseDate: payload.releaseDate,
        backdropPath: payload.backdropPath,
        originalLanguage: payload.originalLanguage,
        originalTitle: payload.originalTitle,
        overview: payload.overview,
      },
    });
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(0, inputRef.current?.value.length ?? 0);
  };

  const listRef = useRef<HTMLUListElement>(null);

  const { focusedIndex, setFocusedIndex } = useListKeyboardNavigate({
    listenerRef: searchContainerRef,
    listRef: listRef,
    length: data?.length ?? 0,
    onSelect: (index) => {
      if (!data || data.length === 0) return;
      handleSelect(index);
      setFocusedIndex(-1);
    },
  });

  useEffect(() => setFocusedIndex(0), [q]);

  if (!data || data.length === 0 || !q) return null;
  return (
    <MovieSearchResultsList ref={listRef}>
      {data.map((movie, index) => (
        <MovieSearchResultsListItem
          key={movie.id}
          movie={movie}
          isHighlighted={focusedIndex === index}
          onClick={() => {
            handleSelect(index);
          }}
          onMouseMove={() => {
            setFocusedIndex(index);
          }}
          trailing={
            movieIds.includes(movie.id) ? (
              <Badge>Added</Badge>
            ) : focusedIndex === index ? (
              <span className="text-xs text-white/40">⏎</span>
            ) : null
          }
        />
      ))}
    </MovieSearchResultsList>
  );
};
