import { clsx } from 'clsx';

import { userAgent } from '@/utils';

export const KeyboardShortcut = ({
  defaultKeys,
  macosKeys,
  label,
  ...props
}: { defaultKeys: string[]; macosKeys?: string[]; label?: string } & React.ComponentProps<'span'>) => {
  const { isMac } = userAgent();

  const getKeys = () => {
    if (isMac && macosKeys) {
      return macosKeys;
    }
    return defaultKeys;
  };

  return (
    <span {...props} className={clsx('whitespace-nowrap text-xs font-medium text-white/40', props.className)}>
      <span className="select-none rounded px-1">{getKeys().join(' ')}</span>
      {label && <span className="ml-1">{label}</span>}
    </span>
  );
};
