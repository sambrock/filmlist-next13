'use client';

import { CopyOutlined, LinkOutlined } from '@ant-design/icons';

import { ButtonIcon } from './ButtonIcon';

type InputCopyProps = React.ComponentProps<'div'> & { value: string };

export const InputCopy = ({ value, ...props }: InputCopyProps) => {
  return (
    <div
      {...props}
      className="flex items-center justify-between rounded border border-neutral-600 bg-neutral-700 px-2 py-0.5 text-sm "
    >
      <div
        className="inline-flex w-4/5 items-center gap-2"
        onClick={(e) => {
          const range = document.createRange();
          range.selectNodeContents(e.currentTarget);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
        }}
      >
        <LinkOutlined className="text-white/40" />
        <span className="overflow-clip overflow-ellipsis whitespace-nowrap font-medium text-white/60 mt-[3px]">{value}</span>
      </div>
      <ButtonIcon size="small" icon={<CopyOutlined />} />
    </div>
  );
};
