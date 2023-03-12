'use client';

import { useSetAtom } from 'jotai';

import { listActionsIsActiveAtom } from './ListActions/ListActionsEdit';

type ListHeaderProps = {
  actions: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
};

export const ListHeader = (props: ListHeaderProps) => {
  const setIsListActionsActive = useSetAtom(listActionsIsActiveAtom);

  return (
    <div
      className="grid grid-cols-2 gap-2"
      onMouseOver={() => setIsListActionsActive(true)}
      onMouseLeave={() => setIsListActionsActive(false)}
    >
      <div className="col-span-2 col-start-1">{props.actions}</div>
      <div className="col-span-1 col-start-1 space-y-4">
        {props.title}
        {props.description}
      </div>
    </div>
  );
};
