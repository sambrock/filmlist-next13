'use client';

import { useRef } from 'react';
import { useEventListener } from 'usehooks-ts';

import { useMenu } from '@/hooks/useMenu';
import { ListShareMenu } from './ListShareMenu';
import { ListShareMenuButton } from './ListShareMenuButton';

export const ListShare = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const menu = useMenu({ containerRef });

  useEventListener('keydown', (e) => {
    if (e.key === 'i' && e.shiftKey && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      menu.toggle();
    }
  });

  return (
    <div ref={containerRef} {...menu.getContainerProps()} className="block md:relative">
      <ListShareMenuButton {...menu.getMenuButtonProps<HTMLButtonElement>()} />
      <ListShareMenu {...menu.getMenuProps<HTMLDivElement>()} />
    </div>
  );
};
