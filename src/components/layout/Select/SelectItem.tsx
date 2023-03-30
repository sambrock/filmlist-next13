import { Spinner } from '@/components/common/Spinner';
import { LoadingOutlined } from '@ant-design/icons';
import { clsx } from 'clsx';

type SelectItemProps = React.ComponentProps<'li'> & {
  trailing?: React.ReactNode;
  leading?: React.ReactNode;
  isHighlighted?: boolean;
  isLoading?: boolean;
};

export const SelectItem = ({
  leading,
  trailing,
  isHighlighted,
  isLoading,
  ...props
}: React.PropsWithChildren<SelectItemProps>) => {
  return (
    <li
      {...props}
      role="button"
      className={clsx(
        'mx-1 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1',
        {
          'bg-transparent': !isHighlighted,
          'bg-neutral-500': isHighlighted,
        },
        {
          'pointer-events-none opacity-50': isLoading,
        },
        props.className
      )}
    >
      {isLoading ? (
        <div className="flex items-center text-white/60">
          <Spinner />
        </div>
      ) : leading ? (
        <div className="flex items-center text-white/60">{leading}</div>
      ) : null}
      <span className="mt-[3px] text-sm text-white/60">{props.children}</span>
      {trailing && <div className="ml-auto">{trailing}</div>}
    </li>
  );
};
