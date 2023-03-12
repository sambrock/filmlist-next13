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
        className="inline whitespace-pre-wrap font-serif text-white/60 [&>ol]:ml-4 [&>ol]:list-decimal [&>ol]:pl-4 [&>ul]:ml-4 [&>ul]:list-disc [&>ul]:pl-4"
        dangerouslySetInnerHTML={{ __html: parseMarkdown(text) || text }}
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
        className="text-sm font-medium text-white/60 hover:text-white/80"
        onClick={(e) => {
          e.stopPropagation();
          setIsShowMore(!isShowMore);
        }}
      >
        {isShowMore ? 'Show less' : 'Show more'}
      </button>
    </span>
  );
};
