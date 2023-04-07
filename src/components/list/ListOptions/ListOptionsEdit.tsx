'use client';

import { listEditOptions, ListOptions } from './ListOptions';

export const ListOptionsEdit = ({ listId }: { listId: string }) => {
  return <ListOptions listOptions={listEditOptions(listId)} />;
};
