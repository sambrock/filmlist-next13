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
    tone?: 'neutral' | 'critical' | 'neutral-blur';
    size?: 'standard' | 'small';
    icon?: React.ReactNode;
    isDisabled?: boolean;
  }
>;

const _Button = <C extends React.ElementType = 'button'>(
  { as, size = 'standard', tone = 'neutral', isDisabled = false, icon, ...props }: ButtonTextProps<C>,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const Component = as || 'button';

  return (
    <Component
      {...props}
      ref={ref}
      className={clsx(
        'default-focus-shadow group flex cursor-pointer select-none items-center whitespace-nowrap font-medium',
        {
          'rounded-md px-2 py-1 text-sm': size === 'standard',
          'rounded px-1.5 py-[1px] text-sm': size === 'small',
        },
        {
          'bg-transparent text-white/40 hover:bg-neutral-700': tone === 'neutral',
          'bg-transparent text-red-500 hover:bg-neutral-700': tone === 'critical',
          'bg-neutral-800-blur hover-bg-neutral-700-blur text-white/40': tone === 'neutral-blur',
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
