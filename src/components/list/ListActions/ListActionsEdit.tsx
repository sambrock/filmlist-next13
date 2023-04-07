'use client';

import { useSetAtom } from 'jotai';
import { FormOutlined } from '@ant-design/icons';

import { isEditingListDescriptionAtom } from '../ListDescription/ListDescriptionEdit';
import { Button } from '@/components/common/Button';

export const ListActionsEdit = () => {
  const setIsEditingDescription = useSetAtom(isEditingListDescriptionAtom);

  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <Button onClick={() => setIsEditingDescription(true)} size="small" icon={<FormOutlined />}>
          Add description
        </Button>
      </div>
    </div>
  );
};
