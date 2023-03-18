'use client';

import { useSetAtom } from 'jotai';

import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  FormOutlined,
  PictureOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { isEditingListDescriptionAtom } from '../ListDescription/ListDescriptionEdit';
import { Button } from '@/components/common/Button';

export const ListActionsStatic = () => {
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
          Hide description
        </Button>
      </div>
      <div className="flex items-center">
        <Button size="small" variant="transparent" icon={<ShareAltOutlined />}>
          Share
        </Button>
        <Button size="small" variant="transparent" icon={<ExportOutlined />}>
          Export
        </Button>
        <Button size="small" variant="transparent" icon={<EditOutlined />}>
          Edit
        </Button>
      </div>
    </div>
  );
};
