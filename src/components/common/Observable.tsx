'use client';

import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

type ObservableProps = {
  onObserve?: () => void;
  rootMargin?: string;
};

export const Observable = ({ onObserve, rootMargin = '50px 0px 100% 0px' }: ObservableProps) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const observer = useIntersectionObserver(observerRef, {
    rootMargin,
  });

  useEffect(() => {
    if (observer?.isIntersecting) {
      onObserve?.();
    }
  }, [observer?.isIntersecting, observer?.time]);

  return <div ref={observerRef} />;
};
