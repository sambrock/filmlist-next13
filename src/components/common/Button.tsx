import { forwardRef } from 'react';
import { clsx } from 'clsx';

import { PolymorphicComponentProps } from '@/utils/polymorphic.type';

// https://fettblog.eu/typescript-react-generic-forward-refs/#option-3%3A-augment-forwardref
declare module 'react' {
  function forwardRef<T, P = Record<string, unknown>>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export type ButtonTextProps<C extends React.ElementType> = PolymorphicComponentProps<
  C,
  {
    tone?: 'neutral' | 'critical' | 'primary' | 'custom';
    variant?: 'solid' | 'transparent';
    size?: 'standard' | 'small';
    icon?: React.ReactNode;
    isDisabled?: boolean;
  }
>;

const _Button = <C extends React.ElementType = 'button'>(
  {
    as,
    size = 'standard',
    tone = 'neutral',
    variant = 'solid',
    isDisabled = false,
    icon,
    ...props
  }: ButtonTextProps<C>,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const Component = as || 'button';

  return (
    <Component
      {...props}
      ref={ref}
      className={clsx(
        'group flex cursor-pointer items-center whitespace-nowrap',
        {
          'rounded-md px-2 py-1 text-sm': size === 'standard',
          'rounded px-1.5 py-[1px] text-sm': size === 'small',
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
      {icon && (
        <div
          className={clsx(
            'inline-block self-center leading-none',
            {
              'mr-2 text-lg': size === 'standard',
              'text-md mr-1.5': size === 'small',
            },
            {
              'text-white/40': tone === 'neutral',
              'text-red-500': tone === 'critical',
            }
          )}
        >
          {icon}
        </div>
      )}
      <span className={clsx('mt-[3px] inline-block')}>{props.children}</span>
    </Component>
  );
};

export const Button = forwardRef(_Button);
