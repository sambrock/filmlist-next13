import { clsx } from 'clsx';

export const listTitleStyles = clsx('text-4xl font-bold');

export const ListTitleStatic = ({ title }: { title: string }) => {
  return <div className={clsx(listTitleStyles, 'text-off-white')} data-cy="list-title">{title}</div>;
};
