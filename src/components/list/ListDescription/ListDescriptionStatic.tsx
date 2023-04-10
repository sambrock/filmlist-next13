'use client';

import { atom, useAtom } from 'jotai';

import { parseMarkdown } from '@/utils/parseMarkdown';
import { useToggleShow } from './hooks/useToggleShow';

export const isListDescriptionShowMoreAtom = atom(false);

export const ListDescriptionStatic = ({
  description,
  ...props
}: React.ComponentProps<'div'> & { description: string }) => {
  const { enableToggleShow, text } = useToggleShow(description);

  return (
    <div {...props}>
      <div
        className="inline whitespace-pre-wrap text-sm text-white/60 lg:text-base [&>ol]:ml-4 [&>ol]:list-decimal [&>ol]:pl-4 [&>ul]:ml-4 [&>ul]:list-disc [&>ul]:pl-4"
        dangerouslySetInnerHTML={{ __html: parseMarkdown(text) || text }}
        data-cy="list-description"
      />
      {enableToggleShow() && <ListDescriptionToggleShow />}
    </div>
  );
};

const ListDescriptionToggleShow = () => {
  const [isShowMore, setIsShowMore] = useAtom(isListDescriptionShowMoreAtom);

  return (
    <span className="ml-2">
      <button
        className="default-focus-shadow rounded text-sm font-medium text-white/60 outline-none hover:text-white/80"
        onClick={(e) => {
          e.stopPropagation();
          setIsShowMore(!isShowMore);
        }}
      >
        {isShowMore ? 'less' : 'more'}
      </button>
    </span>
  );
};
