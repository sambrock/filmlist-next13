'use client';

import { ListOptions, listStaticOptions } from './ListOptions';

export const ListOptionsStatic = ({ listId }: { listId: string }) => {
  return <ListOptions listOptions={listStaticOptions(listId)} />;
};
