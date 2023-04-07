'use client';

import { CheckOutlined, CopyOutlined, LinkOutlined } from '@ant-design/icons';

import { useCopyButton } from '@/hooks/useCopyButton';
import { ButtonIcon } from './ButtonIcon';

type InputCopyProps = React.ComponentProps<'div'> & { value: string };

export const InputCopy = ({ value, ...props }: InputCopyProps) => {
  const copyButton = useCopyButton(value);

  return (
    <div
      {...props}
      className="flex items-center justify-between rounded border border-neutral-500 bg-neutral-600 px-2 py-0.5 text-sm"
    >
      <div
        className="inline-flex w-[92%] items-center gap-2"
        onClick={(e) => {
          const range = document.createRange();
          range.selectNodeContents(e.currentTarget);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
        }}
      >
        <LinkOutlined className="text-white/40" />
        <span className="mt-[3px] overflow-hidden overflow-ellipsis whitespace-nowrap font-medium text-white/60">
          {value}
        </span>
      </div>
      <ButtonIcon
        size="small"
        icon={copyButton.isCopied ? <CheckOutlined /> : <CopyOutlined />}
        {...copyButton.copyButtonProps()}
      />
    </div>
  );
};
