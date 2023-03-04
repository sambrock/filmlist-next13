// 'use client';

// import { forwardRef } from 'react';
// import { clsx } from 'clsx';

// import { PolymorphicComponentProps } from '@/utils/polymorphic.type';

// // https://fettblog.eu/typescript-react-generic-forward-refs/#option-3%3A-augment-forwardref
// declare module 'react' {
//   function forwardRef<T, P = Record<string, unknown>>(
//     render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
//   ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
// }

// export type ButtonTextProps<C extends React.ElementType> = PolymorphicComponentProps<
//   C,
//   {
//     tone?: 'neutral';
//     icon?: string;
//     isDisabled?: boolean;
//   }
// >;

// const _Button = <C extends React.ElementType = 'button'>(
//   { as, tone = 'neutral', icon, isDisabled = false, ...props }: ButtonTextProps<C>,
//   ref: React.ForwardedRef<HTMLButtonElement>
// ) => {
//   const Component = as || 'button';

//   return (
//     <Component
//       {...props}
//       ref={ref}
//       className={clsx(
//         'cursor-pointer whitespace-nowrap font-medium text-sm',
//         {
//           '': tone === 'neutral',
//         },
//         {
//           'flex items-center': icon !== undefined,
//         },
//         {
//           'pointer-events-none opacity-50': isDisabled || props.disabled,
//         },
//         props.className
//       )}
//     >
//       {props.children}
//     </Component>
//   );
// };

// export const Button = forwardRef(_Button);
