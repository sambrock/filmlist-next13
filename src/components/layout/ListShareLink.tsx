'use client';

import { LinkOutlined } from '@ant-design/icons';

export const ListShareLink = ({ listId }: { listId: string }) => {
  return (
    <div className="float-right ml-auto mt-0.5 inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-white/60 hover:bg-black-700">
      <LinkOutlined />
      <span>{`https://filmq.co/${listId}`}</span>
    </div>
  );
};
