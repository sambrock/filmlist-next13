'use client';

import { Fragment, use } from 'react';

import { api } from '@/api/api';
import { MovieItem } from '@/components/movie/MovieItem';

export const ListMoviesRow = ({ listId, page }: { listId: string; page: number }) => {
  const movies = use(
    api.get('/api/v1/getListMovies', {
      params: {
        listId,
        page: page.toString(),
      },
    })
  );

  return (
    <Fragment>
      {movies.map(({ movie }, index) => (
        <MovieItem key={movie.id} movie={movie} index={index} />
      ))}
    </Fragment>
  );
};
