import { clsx } from 'clsx';

export const KeyboardShortcut = ({
  keys,
  label,
  ...props
}: { keys: string[]; label?: string } & React.ComponentProps<'span'>) => {
  return (
    <span {...props} className={clsx('whitespace-nowrap text-xs font-medium text-white/40', props.className)}>
      <span className="select-none rounded px-1">{keys.join(' ')}</span>
      {label && <span className="ml-1">{label}</span>}
    </span>
  );
};
