import { forwardRef } from 'react';
import { clsx } from 'clsx';

export type ButtonIconProps = {
  tone?: 'neutral' | 'critical' | 'primary' | 'custom' | 'neutral-blur';
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
          'rounded p-1 text-sm': size === 'small',
        },
        variant === 'solid' && {
          'bg-neutral-700 text-white/40 hover:bg-neutral-600': tone === 'neutral',
          'bg-neutral-800-blur text-white/40 hover:bg-neutral-600 hover:text-red-500': tone === 'critical',
          // 'bg-neutral-800-blur text-red-500 hover:bg-neutral-600': tone === 'neutral-blur',
        },
        variant === 'transparent' && {
          'bg-transparent text-white/40 hover:bg-neutral-700': tone === 'neutral' || tone === 'primary',
          'bg-transparent text-red-500 hover:bg-neutral-700': tone === 'critical',
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
