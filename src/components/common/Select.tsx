'use client';

import { forwardRef } from 'react';
import { clsx } from 'clsx';

export const Select = forwardRef<HTMLUListElement, React.PropsWithChildren<React.ComponentProps<'ul'>>>(
  (props, ref) => {
    return <ul ref={ref} className="min-w-[200px] max-w-md rounded-md bg-neutral-700 py-1 outline-none" {...props} />;
  }
);

type SelectItemProps = React.ComponentProps<'li'> & {
  label: string;
  subLabel?: string;
  isHighlighted?: boolean;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
};

export const SelectItem = ({
  label,
  subLabel,
  leading,
  trailing,
  isHighlighted,
  ...props
}: React.PropsWithChildren<SelectItemProps>) => {
  return (
    <li
      {...props}
      className={clsx('mx-1 grid cursor-pointer grid-cols-[26px,1fr,auto] rounded px-2 py-1 text-sm', props.className, {
        'text-white/60 hover:bg-neutral-600 hover:text-white/60': !isHighlighted,
        'bg-neutral-600 text-white/60': isHighlighted,
      })}
    >
      {leading && <div className="flex items-center">{leading}</div>}
      <span className="mt-[3px] flex items-center font-medium">{label}</span>
      {trailing && <div className="mt-[3px] flex items-center">{trailing}</div>}
      {subLabel && <div className="col-start-2 row-start-2 text-xs font-medium text-white/40">{subLabel}</div>}
    </li>
  );
};

export const SelectDivider = () => <li className="my-1 h-px bg-neutral-500" />;
