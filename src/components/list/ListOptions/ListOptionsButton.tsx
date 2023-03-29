'use client';

import { EllipsisOutlined } from '@ant-design/icons';

import { ButtonIcon } from '@/components/common/ButtonIcon';

export const ListOptionsButton = (props: React.ComponentProps<'button'>) => {
  // @ts-ignore
  return <ButtonIcon {...props} tone="neutral-blur" icon={<EllipsisOutlined />} />;
};
