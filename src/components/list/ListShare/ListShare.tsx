'use client';

import { useRef } from 'react';
import { useEventListener } from 'usehooks-ts';
import { Transition } from 'react-transition-group';

import { useMenu } from '@/hooks/useMenu';
import { ListShareMenu } from './ListShareMenu';
import { ListShareMenuButton } from './ListShareMenuButton';
import { useAnimation } from '@/hooks/useAnimation';

export const ListShare = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const menu = useMenu({ containerRef });

  useEventListener('keydown', (e) => {
    if (e.key === 'i' && e.shiftKey && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      menu.toggle();
    }
  });

  const animation = useAnimation(menu.isOpen, { animation: 'pop' });

  return (
    <div ref={containerRef} {...menu.getContainerProps()} className="block md:relative">
      <ListShareMenuButton {...menu.getMenuButtonProps<HTMLButtonElement>()} />
      <Transition {...animation.getTransitionProps()}>
        {(state) => <ListShareMenu {...animation.getAnimationProps(state)} />}
      </Transition>
    </div>
  );
};
