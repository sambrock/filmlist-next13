'use client';

import { Button } from '@/components/common/Button';

import { DeleteOutlined, ExportOutlined, FormOutlined, PictureOutlined, ShareAltOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { atom, useAtom, useAtomValue } from 'jotai';

export const listActionsIsActiveAtom = atom(false);

export const ListActionsEdit = () => {
  const isActive = useAtomValue(listActionsIsActiveAtom);

  return (
    <div
      className={clsx('flex justify-between', {
        'opacity-100': isActive,
        'opacity-0': !isActive,
      })}
    >
      <div className="flex items-center">
        <Button size="small" variant="transparent" icon={<FormOutlined />}>
          Add description
        </Button>
        <Button size="small" variant="transparent" icon={<PictureOutlined />}>
          Add cover
        </Button>
      </div>
      <div className="flex items-center">
        <Button size="small" variant="transparent" icon={<ShareAltOutlined />}>
          Share
        </Button>
        <Button size="small" variant="transparent" icon={<ExportOutlined />}>
          Export
        </Button>
        <Button
          tone="custom"
          className="text-white/40 hover:bg-black-700 hover:text-red-500"
          size="small"
          variant="transparent"
          icon={<DeleteOutlined />}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
