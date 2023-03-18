'use client';

import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import useSwr from 'swr';

import { api } from '@/api';
import { useListStore } from '@/store/list/useListStore';
import { MAX_LIST_MOVIES } from '@/constants';

const dispatch = useListStore.getState().dispatch;

export const MovieLoader = ({ listId, count }: { listId: string; count: number }) => {
  const [page, setPage] = useState(2);

  const isLoadingRef = useRef(false);

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
        dispatch({ type: 'ADD_MOVIES', payload: data });
        isLoadingRef.current = false;
      },
    }
  );

  useEffect(() => {
    if (page * MAX_LIST_MOVIES >= count) return;
    if (isLoadingRef.current) return;
    if (observer?.isIntersecting && !isLoading) {
      setPage((page) => page + 1);
      isLoadingRef.current = true;
    }
  }, [observer?.isIntersecting]);

  return <div className="h-1" ref={observerRef}></div>;
};
