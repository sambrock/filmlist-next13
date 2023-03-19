'use client';

import { useSetAtom } from 'jotai';

import { FormOutlined } from '@ant-design/icons';
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
    </div>
  );
};
