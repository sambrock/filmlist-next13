'use client';

import type { Movie } from '@prisma/client';
import { shallow } from 'zustand/shallow';
import { PlusOutlined } from '@ant-design/icons';

import { useListStore } from '@/store/list/useListStore';
import { MovieItem } from '@/components/movie/MovieItem';

const getMovie = (key: string) => useListStore.getState().data.movies.get(key)?.movie as Movie;

export const ListMoviesEdit = ({ initialMovies }: { initialMovies: string }) => {
  const keys = useListStore(
    (state) => [...state.data.movies.values()].sort((a, b) => a.order - b.order).map((v) => v.movieId.toString()),
    shallow
  );

  if (!keys || !keys.length) {
    return (
      <ul className="mb-44 grid grid-cols-7 gap-2" suppressHydrationWarning={true}>
        {(JSON.parse(initialMovies) as Movie[]).map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
        <div className="group flex aspect-poster cursor-pointer items-center justify-center rounded  bg-black-700 hover:bg-black-700">
          <PlusOutlined className="text-4xl font-bold text-black-300 group-hover:text-black-300" />
        </div>
      </ul>
    );
  }
  return (
    <ul className="mb-44 grid grid-cols-7 gap-2">
      {keys.map((key) => (
        <MovieItem key={key} movie={getMovie(key)} />
      ))}
      <div className="group flex aspect-poster cursor-pointer items-center justify-center rounded  bg-black-700 hover:bg-black-700">
        <PlusOutlined className="text-4xl font-bold text-black-300 group-hover:text-black-300" />
      </div>
    </ul>
  );
};
