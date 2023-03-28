'use client';

import { forwardRef, Fragment } from 'react';
import { LinkOutlined, ShareAltOutlined } from '@ant-design/icons';
import { atom, useSetAtom } from 'jotai';
import { useEventListener } from 'usehooks-ts';

import { Button } from '../common/Button';
import { ButtonIcon } from '../common/ButtonIcon';
import { useListStore } from '@/store/list/useListStore';
import { InputCopy } from '../common/InputCopy';

export const isShareMenuOpenAtom = atom(false);

export const ShareMenuButton = () => {
  const setShareMenuOpen = useSetAtom(isShareMenuOpenAtom);

  useEventListener('keydown', (e) => {
    if (e.key === 'i' && e.shiftKey && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setShareMenuOpen(true);
    }
  });

  return (
    <Fragment>
      <Button
        className="hidden md:flex"
        tone="primary"
        variant="solid"
        icon={<ShareAltOutlined />}
        onClick={() => {
          setShareMenuOpen(true);
        }}
      >
        Share
      </Button>
      <ButtonIcon
        className="flex md:hidden"
        variant="transparent"
        icon={<ShareAltOutlined />}
        onClick={() => {
          setShareMenuOpen(true);
        }}
      />
    </Fragment>
  );
};

export const ShareMenu = forwardRef<HTMLDivElement>((props, ref) => {
  const [listId, token] = useListStore((state) => [state.data.list.id, state.data.list.token]);

  return (
    <div
      ref={ref}
      className="shadow-black-900 min-w-[340px] max-w-md space-y-4 rounded-lg border border-neutral-700 bg-neutral-800 p-4 shadow-md"
    >
      <div className="space-y-1">
        <div className="flex justify-between">
          <div className="text-xs font-medium text-white/60">Share link</div>
          <div className="mb-1 text-xs text-white/40">Anyone with the link can view</div>
        </div>
        <InputCopy value={`https://fimlq.co/v/${listId}`} />
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <div className="text-xs font-medium text-white/60">Edit link</div>
          <div className="mb-1 text-xs text-white/40">Anyone with the link can edit</div>
        </div>
        <InputCopy value={`https://fimlq.co/e/${listId}?t=${token}`} />
      </div>
    </div>
  );
});
