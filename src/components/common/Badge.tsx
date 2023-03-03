import clsx from 'clsx';

type BadgeProps = {
  tone?: 'neutral';
};

export const Badge = ({ tone = 'neutral', ...props }: React.PropsWithChildren<BadgeProps>) => {
  return (
    <span
      className={clsx('inline-block whitespace-nowrap rounded-md px-1 pt-[2px] text-xs', {
        'bg-white/10 text-white/40': tone === 'neutral',
      })}
    >
      {props.children}
    </span>
  );
};
