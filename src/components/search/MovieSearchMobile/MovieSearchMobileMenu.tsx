'use client';

import { useRef } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAtom, useSetAtom } from 'jotai';
import { clsx } from 'clsx';

import { ButtonIcon } from '@/components/common/ButtonIcon';
import { useSearchMovies } from '@/hooks/api/useSearchMovies';
import { GET_SearchMovies } from '@/pages/api/v1/searchMovies';
import { useListStore } from '@/store/list/useListStore';
import { searchQueryAtom } from '../MovieSearch';
import { MovieSearchResultsList, MovieSearchResultsListItem } from '../MovieSearchResultsList';
import { isMovieSearchMobileActiveAtom } from './MovieSearchMobile';

const dispatch = useListStore.getState().dispatch;

export const MovieSearchMobileMenu = (props: React.ComponentProps<'div'>) => {
  const [q, setSearchQuery] = useAtom(searchQueryAtom);
  const setIsMovieSearchMobileActive = useSetAtom(isMovieSearchMobileActiveAtom);

  const { data } = useSearchMovies(q);

  const movies = (data?.flat().filter(Boolean) as GET_SearchMovies['data']) || [];

  const timeoutRef = useRef<NodeJS.Timeout>();

  return (
    <div {...props} className={clsx('rounded-md bg-neutral-700 shadow-md shadow-neutral-900', props.className)}>
      <div className="flex items-center gap-2 px-2 py-1">
        <ButtonIcon icon={<ArrowLeftOutlined />} onClick={() => setIsMovieSearchMobileActive(false)} />
        <input
          type="text"
          className="mt-0.5 w-full bg-transparent text-sm text-off-white placeholder:text-white/40 focus:outline-none"
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
