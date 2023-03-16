import { clsx } from 'clsx';

export const listTitleStyles = clsx('text-4xl font-bold');

export const ListTitleStatic = ({ title }: { title: string }) => {
  return <div className={clsx(listTitleStyles, 'text-white-text')}>{title}</div>;
};
