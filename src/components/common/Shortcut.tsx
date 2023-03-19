import clsx from 'clsx';

export const Shortcut = (props: React.PropsWithChildren<React.ComponentProps<'span'>>) => {
  return (
    <span {...props} className={clsx('text-xs text-white/40', props.className)}>
      {props.children}
    </span>
  );
};
