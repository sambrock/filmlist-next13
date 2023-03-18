'use client';

import { useRef } from 'react';
import { useIsClient } from 'usehooks-ts';

import { useListStore } from '@/store/list/useListStore';
import { api } from '@/api';

export const InitSession = ({ isSession }: { isSession: boolean }) => {
  const isInit = useRef(false);
  const isClient = useIsClient();

  if (!isInit.current && isClient && !isSession) {
    api.post('/api/v1/initialize', null).then(() => {
      api.post('/api/v1/createList', null).then((data) => {
        useListStore.setState({ data: { list: data, movies: new Map() } });
      });
    });

    isInit.current = true;
  }

  return null;
};
