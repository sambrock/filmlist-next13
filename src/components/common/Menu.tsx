import { useRef } from 'react';
import { clsx } from 'clsx';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

type MenuProps = {
  menuButton: React.ReactNode;
  menu: (ref: React.RefObject<HTMLDivElement>) => React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  relative?: boolean;
  menuPos?: 'left' | 'right';
};

export const Menu = ({
  menuButton,
  menu,
  isOpen,
  setIsOpen,
  relative = true,
  menuPos = 'right',
  ...props
}: MenuProps & React.ComponentProps<'div'>) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(
    menuRef,
    () => {
      if (window.getSelection()?.toString()) return;
      setIsOpen(false);
    },
    'mouseup'
  );
  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
  });

  return (
    <div {...props} className={clsx(relative && 'relative', props.className)}>
      {menuButton}
      <div
        className={clsx(
          relative && 'mt-2',
          {
            'z-40': isOpen,
            hidden: !isOpen,
          },
          {
            'absolute top-full left-0': menuPos === 'left',
            'absolute top-full right-0': menuPos === 'right',
          }
        )}
      >
        {menu(menuRef)}
      </div>
    </div>
  );
};
