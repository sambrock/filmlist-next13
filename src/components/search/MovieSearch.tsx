'use client';

import { useEffect, useRef } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { clsx } from 'clsx';
import { shallow } from 'zustand/shallow';
import { useEventListener, useHover, useOnClickOutside } from 'usehooks-ts';

import { useListKeyboardNavigate } from '@/hooks/useListKeyboardNavigate';
import { MovieSearchInput } from './MovieSearchInput';
import { useListStore } from '@/store/list/useListStore';
import { MovieSearchResultsList, MovieSearchResultsListItem } from './MovieSearchResultsList';
import { Badge } from '../common/Badge';
import { MovieSearchHelper } from './MovieSearchHelper';
import { GET_SearchMovies } from '@/pages/api/v1/searchMovies';
import { useSearchMovies } from '@/hooks/api/useSearchMovies';
import { KeyboardShortcut } from '../common/KeyboardShortcut';

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

  const q = useAtomValue(searchQueryAtom);

  const { data, hasMore, setSize, size } = useSearchMovies(q);

  const movies = (data?.flat().filter(Boolean) as GET_SearchMovies['data']) || [];

  useEventListener(
    'keydown',
    (e) => {
      if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (!hasMore) return;
        setSize(size + 1);
      }
    },
    searchContainerRef
  );

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

  const isHover = useHover(searchContainerRef);

  return (
    <div
      ref={searchContainerRef}
      tabIndex={0}
      className={clsx('relative outline-none', {
        'bg-neutral-800-blur rounded-md transition-colors hover:bg-neutral-700': !searchIsActive,
        'rounded-t-md bg-neutral-700 ': searchIsActive,
      })}
      onFocus={() => {
        setSearchIsActive(true);
      }}
    >
      <MovieSearchInput
        ref={inputRef}
        isHover={isHover}
        isSearchActive={searchIsActive}
        onFocus={() => setSearchIsActive(true)}
      />
      {searchIsActive && (
        <div className={clsx('absolute z-20 w-full rounded-b-md bg-neutral-700 shadow-lg shadow-neutral-900')}>
          <MovieSearchResults movies={movies} searchContainerRef={searchContainerRef} inputRef={inputRef} />
          <MovieSearchHelper searchContainerRef={searchContainerRef} />
        </div>
      )}
    </div>
  );
};

const MovieSearchResults = ({
  movies,
  searchContainerRef,
  inputRef,
}: {
  movies: GET_SearchMovies['data'];
  searchContainerRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
}) => {
  const movieIds = useListStore((state) => [...state._listMovieIds.values()], shallow);

  const handleSelect = (index: number) => {
    if (!movies || movies.length === 0) return;
    if (movieIds.includes(movies?.[index]?.id)) return;
    const payload = movies?.[index];
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
    length: movies.length ?? 0,
    onSelect: (index) => {
      if (!movies || movies.length === 0) return;
      handleSelect(index);
      setFocusedIndex(-1);
    },
  });

  const q = useAtomValue(searchQueryAtom);

  useEffect(() => setFocusedIndex(0), [q]);

  if (!movies || movies.length === 0 || !q) return null;
  return (
    <MovieSearchResultsList ref={listRef}>
      {movies.map((movie, index) => (
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
              <KeyboardShortcut keys={['⏎']} />
            ) : null
          }
        />
      ))}
    </MovieSearchResultsList>
  );
};
