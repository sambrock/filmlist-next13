'use client';

import { forwardRef, Fragment } from 'react';
import { LinkOutlined, ShareAltOutlined } from '@ant-design/icons';
import { atom, useSetAtom } from 'jotai';

import { Button } from '../common/Button';
import { ButtonIcon } from '../common/ButtonIcon';

export const isShareMenuOpenAtom = atom(false);

export const ShareMenuButton = () => {
  const setShareMenuOpen = useSetAtom(isShareMenuOpenAtom);

  return (
    <Fragment>
      <Button
        className="hidden md:flex"
        variant="transparent"
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

export const ShareMenu = forwardRef<HTMLDivElement, { listId: string }>(({ listId }, ref) => {
  return (
    <div ref={ref} className="min-w-[340px] max-w-md space-y-6 rounded-md bg-black-700 p-4 shadow-md shadow-black-900">
      <div className="space-y-1">
        <div className="flex justify-between">
          <div className="text-xs font-medium text-white/60">Share link</div>
          <div className="mb-1 text-xs text-white/40">Anyone with the link can view</div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex w-full rounded-md border-black-500 bg-black-500 px-2 py-1 text-sm text-white/60"
            onClick={(e) => {
              const range = document.createRange();
              range.selectNodeContents(e.currentTarget);
              const selection = window.getSelection();
              selection?.removeAllRanges();
              selection?.addRange(range);
            }}
          >
            <span className="mt-[3px]">https://filmq.co/v/{listId}</span>
          </div>
          <Button icon={<LinkOutlined className="text-base" />} tone="neutral-light">
            Copy
          </Button>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <div className="text-xs font-medium text-white/60">Edit link</div>
          <div className="mb-1 text-xs text-white/40">Anyone with the link can edit</div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-full overflow-clip overflow-ellipsis whitespace-nowrap rounded-md border-black-500 bg-black-500 px-2 py-1 pt-[7px] text-sm text-white/60"
            onClick={(e) => {
              const range = document.createRange();
              range.selectNodeContents(e.currentTarget);
              const selection = window.getSelection();
              selection?.removeAllRanges();
              selection?.addRange(range);
            }}
          >
            <span className="">https://filmq.co/e/{listId}?t=p4z5ptdkh89l9mtu9rik3r</span>
          </div>
          <Button icon={<LinkOutlined className="text-base" />} tone="neutral-light">
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
});
