'use client';

import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import useSwr from 'swr';

import { api } from '@/api/api';
import { MAX_LIST_MOVIES } from '@/utils/constants';
import type { ListMoviesWithMovie } from '@/pages/api/v1/getListMovies';

type ListMoviesObservableProps = {
  listId: string;
  count: number;
  onLoad: (movies: ListMoviesWithMovie[]) => void;
  onObserve?: () => void;
};

export const ListMoviesObservable = ({ listId, count, onLoad, onObserve }: ListMoviesObservableProps) => {
  const [page, setPage] = useState(2);

  const observerRef = useRef<HTMLDivElement>(null);
  const observer = useIntersectionObserver(observerRef, {
    rootMargin: '50px 0px 100% 0px',
  });

  const { isLoading } = useSwr(
    [listId, page],
    () => api.get('/api/v1/getListMovies', { params: { listId, page: page.toString() } }),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        onLoad(data);
      },
    }
  );

  const handleIncrementPage = () => {
    if (page * MAX_LIST_MOVIES >= count) return;
    if (isLoading) return;
    setPage((page) => page + 1);
  };

  useEffect(() => {
    if (observer?.isIntersecting) {
      onObserve?.();
      handleIncrementPage();
    }
  }, [observer?.isIntersecting]);

  return <div style={{ height: '1px' }} ref={observerRef} />;
};
