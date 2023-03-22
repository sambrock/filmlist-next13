import { forwardRef } from 'react';
import { clsx } from 'clsx';

export type ButtonIconProps = {
  tone?: 'neutral' | 'critical' | 'primary' | 'custom';
  variant?: 'solid' | 'transparent';
  size?: 'standard' | 'small';
  icon?: React.ReactNode;
  isDisabled?: boolean;
};

const _ButtonIcon = (
  {
    size = 'standard',
    tone = 'neutral',
    variant = 'solid',
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
        'group flex cursor-pointer items-center',
        {
          'rounded p-1.5 text-lg': size === 'standard',
          'rounded p-1.5 text-base': size === 'small',
        },
        variant === 'solid' && {
          'bg-black-700 text-white/40 hover:bg-black-600': tone === 'neutral',
          'bg-black-700 text-red-500 hover:bg-black-600': tone === 'critical',
          'bg-[#fccc03] text-black-700 hover:bg-white/90': tone === 'primary',
        },
        variant === 'transparent' && {
          'bg-transparent text-white/40 hover:bg-black-700': tone === 'neutral' || tone === 'primary',
          'bg-transparent text-red-500 hover:bg-black-700': tone === 'critical',
        },
        { 'pointer-events-none opacity-50': isDisabled || props.disabled },
        props.className
      )}
    >
      {icon}
    </button>
  );
};

export const ButtonIcon = forwardRef(_ButtonIcon);
