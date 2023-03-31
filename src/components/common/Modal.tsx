'use client';

import { useLockedBody } from 'usehooks-ts';

export type ModalProps = {
  isOpen: boolean;
  close: () => void;
  body: React.ReactNode;
};

export const Modal = ({ isOpen, close, body }: ModalProps) => {
  useLockedBody(isOpen);

  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 z-40 shadow-md shadow-neutral-900">
      <div className="relative h-screen w-screen overflow-y-auto overflow-x-hidden">
        <div className="fixed top-0 right-0 h-screen w-screen bg-black/75" onClick={close} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-neutral-900">
          {body}
        </div>
      </div>
    </div>
  );
};
