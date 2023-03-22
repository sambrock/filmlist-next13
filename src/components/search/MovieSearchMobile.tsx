'use client';

import { useRef } from 'react';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { atom, useAtom, useSetAtom } from 'jotai';

import { useSearchMovies } from '@/hooks/api/useSearchMovies';
import type { GET_SearchMovies } from '@/pages/api/v1/searchMovies';
import { ButtonIcon } from '../common/ButtonIcon';
import { searchQueryAtom } from './MovieSearch';
import { MovieSearchResultsList, MovieSearchResultsListItem } from './MovieSearchResultsList';
import { useListStore } from '@/store/list/useListStore';

export const isMovieSearchMobileActiveAtom = atom(false);

export const MovieSearchMobileButton = () => {
  const setIsMovieSearchMobileActive = useSetAtom(isMovieSearchMobileActiveAtom);

  return (
    <button
      className="flex w-full items-center gap-2 rounded-md bg-black-700 px-2 py-1 text-sm text-white/40 text-white-text placeholder:text-white/40 focus:outline-none"
      onClick={() => setIsMovieSearchMobileActive(true)}
    >
      <PlusOutlined className="text-lg" />
      <span className="mt-[3px]">Add a film</span>
    </button>
  );
};

const dispatch = useListStore.getState().dispatch;

export const MovieSearchMobile = () => {
  const [q, setSearchQuery] = useAtom(searchQueryAtom);
  const setIsMovieSearchMobileActive = useSetAtom(isMovieSearchMobileActiveAtom);

  const { data } = useSearchMovies(q);

  const movies = (data?.flat().filter(Boolean) as GET_SearchMovies['data']) || [];

  const timeoutRef = useRef<NodeJS.Timeout>();

  return (
    <div className="rounded-md bg-black-700 shadow-md shadow-black-900">
      <div className="flex items-center gap-2 px-2 py-1">
        <ButtonIcon icon={<ArrowLeftOutlined />} onClick={() => setIsMovieSearchMobileActive(false)} />
        <input
          type="text"
          className="mt-0.5 w-full bg-transparent text-sm text-white-text placeholder:text-white/40 focus:outline-none"
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
      {movies.length > 0 && (
        <div className="">
          <MovieSearchResultsList>
            {movies.map((movie) => (
              <MovieSearchResultsListItem
                key={movie.id}
                movie={movie}
                isHighlighted={false}
                onClick={() =>
                  dispatch({
                    type: 'ADD_MOVIE',
                    payload: {
                      id: movie.id,
                      title: movie.title,
                      originalTitle: movie.originalTitle,
                      originalLanguage: movie.originalLanguage,
                      overview: movie.overview,
                      releaseDate: movie.releaseDate,
                      backdropPath: movie.backdropPath,
                      posterPath: movie.posterPath,
                    },
                  })
                }
              />
            ))}
          </MovieSearchResultsList>
        </div>
      )}
    </div>
  );
};
