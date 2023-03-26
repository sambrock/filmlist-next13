'use client';

import { useRef } from 'react';
import { useIsClient } from 'usehooks-ts';

export const InitializeClient = ({ listTokenCookie }: { listTokenCookie: string }) => {
  const isClient = useIsClient();
  const isInit = useRef(false);

  if (!isInit.current && isClient) {
    if (listTokenCookie) document.cookie = listTokenCookie;

    isInit.current = true;
  }

  return null;
};
