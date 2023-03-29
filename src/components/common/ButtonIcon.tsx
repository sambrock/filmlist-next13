import { forwardRef } from 'react';
import { clsx } from 'clsx';

export type ButtonIconProps = {
  tone?: 'neutral' | 'critical' | 'neutral-blur';
  size?: 'standard' | 'small';
  icon?: React.ReactNode;
  isDisabled?: boolean;
};

const _ButtonIcon = (
  {
    size = 'standard',
    tone = 'neutral',
    isDisabled = false,
    icon,
    ...props
  }: React.PropsWithChildren<ButtonIconProps & React.ComponentProps<'button'>>,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  return (
    <button
      {...props}
      ref={ref}
      className={clsx(
        'default-focus-shadow group flex cursor-pointer items-center',
        {
          'rounded p-1.5 text-lg': size === 'standard',
          'rounded p-1 text-sm': size === 'small',
        },
        {
          'bg-transparent text-white/40 hover:bg-neutral-700': tone === 'neutral',
          'bg-transparent text-red-500 hover:bg-neutral-700': tone === 'critical',
          'hover-bg-neutral-700-blur bg-neutral-800-blur text-white/40': tone === 'neutral-blur',
        },
        { 'pointer-events-none opacity-50': isDisabled || props.disabled },
        props.className
      )}
      // onMouseDown={(e) => {
      //   Prevent focus ring from showing up on click
      //   e.preventDefault();
      //   props?.onMouseDown?.(e);
      // }}
    >
      {icon}
    </button>
  );
};

export const ButtonIcon = forwardRef(_ButtonIcon);
