'use client';

import { useSetAtom } from 'jotai';

import { DeleteOutlined, ExportOutlined, FormOutlined, PictureOutlined, ShareAltOutlined } from '@ant-design/icons';
import { isEditingListDescriptionAtom } from '../ListDescription/ListDescriptionEdit';
import { Button } from '@/components/common/Button';

export const ListActionsEdit = () => {
  const setIsEditingDescription = useSetAtom(isEditingListDescriptionAtom);

  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <Button
          onClick={() => setIsEditingDescription(true)}
          size="small"
          variant="transparent"
          icon={<FormOutlined />}
        >
          Add description
        </Button>
        <Button size="small" variant="transparent" icon={<PictureOutlined />}>
          Add cover
        </Button>
      </div>
      {/* <div className="flex items-center">
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
      </div> */}
    </div>
  );
};
