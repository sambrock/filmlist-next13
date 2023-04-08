'use client';

import { forwardRef } from 'react';
import { clsx } from 'clsx';

import { useListStore } from '@/store/list/useListStore';
import { InputCopy } from '@/components/common/InputCopy';

export const ListShareMenu = forwardRef<HTMLDivElement, React.ComponentProps<'div'>>((props, ref) => {
  const [listId, token] = useListStore((state) => [state.data.list.id, state.data.list.token]);

  const shareLink = `https://filmq.co/v/${listId}`;
  const editLink = `https://filmq.co/e/${listId}?t=${token}`;

  return (
    <div
      {...props}
      ref={ref}
      className={clsx(
        'w-full space-y-4 rounded-md bg-neutral-700 p-4 shadow-md shadow-neutral-900 sm:w-[448px]',
        'absolute right-0 mt-2',
        props.className
      )}
    >
      <div className="space-y-1">
        <div className="flex justify-between">
          <div className="text-xs font-medium text-white/60">Share link</div>
          <div className="mb-1 text-xs text-white/40">Anyone with the link can view</div>
        </div>
        <InputCopy value={shareLink} />
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <div className="text-xs font-medium text-white/60">Edit link</div>
          <div className="mb-1 text-xs text-white/40">Anyone with the link can edit</div>
        </div>
        <InputCopy value={editLink} />
      </div>
    </div>
  );
});
