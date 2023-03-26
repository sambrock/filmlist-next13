'use client';

import { useRef } from 'react';
import { useIsClient } from 'usehooks-ts';

export const InitializeClient = ({ sessionTokenCookie }: { sessionTokenCookie: string }) => {
  const isClient = useIsClient();
  const isInit = useRef(false);

  if (!isInit.current && isClient) {
    document.cookie = sessionTokenCookie;

    isInit.current = true;
  }

  return null;
};
