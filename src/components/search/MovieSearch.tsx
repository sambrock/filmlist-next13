'use client';

import { useRef } from 'react';
import { atom, useAtomValue } from 'jotai';
import useSWR from 'swr';
import { clsx } from 'clsx';
import { shallow } from 'zustand/shallow';

import { useListKeyboardNavigate } from '@/hooks/useListKeyboardNavigate';
import { MovieSearchInput } from './MovieSearchInput';
import { api } from '@/api/api';
import { useListStore } from '@/store/list/useListStore';
import { MovieSearchResultsList, MovieSearchResultsListItem } from './MovieSearchResultsList';
import { Badge } from '../common/Badge';

export const searchQueryAtom = atom('', (get, set, value: string) => {
  set(searchQueryAtom, value);
});

const dispatch = useListStore.getState().dispatch;

export const MovieSearch = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      ref={searchContainerRef}
      tabIndex={0}
      className={clsx('rounded-md bg-black-700 shadow-lg shadow-black/60 outline-none')}
    >
      <MovieSearchInput ref={inputRef} />
      <MovieSearchResults searchContainerRef={searchContainerRef} inputRef={inputRef} />
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

  const { data } = useSWR(['search', q], q ? () => api.get('/api/v1/searchMovies', { params: { q } }) : null, {
    keepPreviousData: true,
    onSuccess: () => {
      setFocusedIndex(0);
    },
  });

  const handleSelect = (index: number) => {
    if (!data) return;
    if (movieIds.includes(data?.[index]?.id)) return;
    dispatch({ type: 'ADD_MOVIE', payload: data?.[index] });
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(0, inputRef.current?.value.length ?? 0);
  };

  const { focusedIndex, setFocusedIndex } = useListKeyboardNavigate({
    listRef: searchContainerRef,
    length: data?.slice(0, 4).length ?? 0,
    onSelect: (index) => {
      if (!data) return;
      handleSelect(index);
      setFocusedIndex(-1);
    },
  });

  if (!data) return null;
  return (
    <MovieSearchResultsList>
      {data?.slice(0, 4).map((movie, index) => (
        <MovieSearchResultsListItem
          key={movie.id}
          movie={movie}
          isHighlighted={focusedIndex === index}
          onClick={() => {
            handleSelect(index);
          }}
          onMouseEnter={() => {
            setFocusedIndex(index);
          }}
          trailing={
            movieIds.includes(movie.id) ? <Badge>Added</Badge> : focusedIndex === index ? <Badge>Add ⏎</Badge> : null
          }
        />
      ))}
    </MovieSearchResultsList>
  );
};
