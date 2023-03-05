'use client';

import { useSetAtom } from 'jotai';
import { listActionsIsActiveAtom } from './ListActions/ListActionsEdit';

export const ListHeader = (props: React.PropsWithChildren) => {
  const setIsListActionsActive = useSetAtom(listActionsIsActiveAtom);
  return (
    <div
      className="grid gap-2"
      onMouseOver={() => setIsListActionsActive(true)}
      onMouseLeave={() => setIsListActionsActive(false)}
    >
      {props.children}
    </div>
  );
};
