import { forwardRef } from 'react';
import { clsx } from 'clsx';

export const ListOptionsMenu = forwardRef<HTMLUListElement, React.PropsWithChildren<React.ComponentProps<'ul'>>>(
  (props, ref) => {
    return (
      <ul
        {...props}
        ref={ref}
        className={clsx('min-w-[200px] rounded-md bg-neutral-700 py-1 shadow-md shadow-neutral-900', props.className)}
      >
        {props.children}
      </ul>
    );
  }
);
