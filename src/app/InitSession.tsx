'use client';

import { useRef } from 'react';
import { useIsClient } from 'usehooks-ts';

import { useListStore } from '@/store/list/useListStore';
import type { List } from '@prisma/client';
import { api } from '@/api/api';

export const InitSession = ({ isSession }: { isSession: boolean }) => {
  const isInit = useRef(false);
  const isClient = useIsClient();

  if (!isInit.current && isClient && !isSession) {
    // fetch('/api/v1/initialize', { method: 'POST' }).then((res) => {
    //   fetch('/api/v1/createList', { method: 'POST' }).then(async (res) => {
    //     const list = (await res.json()) as List;
    //     useListStore.setState({ data: { list, movies: new Map() } });
    //   });
    // });

    api.post('/api/v1/initialize', null).then(() => {
      api.post('/api/v1/createList', null).then((data) => {
        useListStore.setState({ data: { list: data, movies: new Map() } });
      });
    });

    isInit.current = true;
  }

  return null;
};
