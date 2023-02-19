'use client';

import { useRef } from 'react';
import { useIsClient } from 'usehooks-ts';

export const InitSession = ({ isSession }: { isSession: boolean }) => {
  const isInit = useRef(false);
  const isClient = useIsClient();

  if (!isInit.current && isClient && !isSession) {
    fetch('/api/v1/initialize', { method: 'POST' }).then((res) => {
      fetch('/api/v1/createList', { method: 'POST' });
    });

    isInit.current = true;
  }

  return null;
};
