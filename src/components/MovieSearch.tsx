'use client';

import { useRef, useState } from 'react';

import { useSearchMovies } from '@/hooks/api/useSearchMovies';
import { useListStore } from '@/store/list/useListStore';

const dispatch = useListStore.getState().dispatch;

export const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data } = useSearchMovies(searchQuery);

  const timeoutRef = useRef<NodeJS.Timeout>();

  return (
    <div>
      <input
        type="text"
        className="text-black"
        onChange={(e) => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setSearchQuery(e.target.value);
          }, 350);
        }}
      />

      <div>
        {data?.map((movie) => (
          <div
            key={movie.id}
            onClick={(e) => {
              dispatch({ type: 'ADD_MOVIE', payload: movie });
            }}
          >
            {movie.title}
          </div>
        ))}
      </div>
    </div>
  );
};
