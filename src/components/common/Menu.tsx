import { clsx } from 'clsx';

type MenuProps = {
  menuButton: React.ReactNode;
  menu: React.ReactNode;
  isActive: boolean;
  relative?: boolean;
  menuPos?: 'left' | 'right' | null;
};

export const Menu = ({
  menuButton,
  menu,
  isActive,
  relative = true,
  menuPos = null,
  ...props
}: MenuProps & React.ComponentProps<'div'>) => {
  return (
    <div {...props} className={clsx(relative && 'relative', props.className)}>
      {menuButton}
      <div
        className={clsx(
          {
            'z-40': isActive,
            hidden: !isActive,
          },
          {
            'absolute top-full left-0': menuPos === 'left',
            'absolute top-full right-0': menuPos === 'right',
          }
        )}
      >
        {menu}
      </div>
    </div>
  );
};
