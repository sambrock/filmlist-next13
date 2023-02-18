'use client';

import { useRef, useState } from 'react';

import { useSearchMovies } from '@/hooks/api/useSearchMovies';

fetch('/api/v1/initialize', { method: 'POST' });

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
          <div key={movie.id}>{movie.title}</div>
        ))}
      </div>
    </div>
  );
};
