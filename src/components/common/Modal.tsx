'use client';

import { clsx } from 'clsx';
import { useLockedBody } from 'usehooks-ts';

type ModalContainerProps = { isOpen: boolean } & React.ComponentProps<'div'>;

export const ModalContainer = ({ isOpen, ...props }: ModalContainerProps) => {
  useLockedBody(isOpen);

  return (
    <div
      {...props}
      className={clsx(
        'fixed top-0 left-0 z-50 flex h-full w-full items-start justify-center overflow-y-auto bg-black/60',
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
