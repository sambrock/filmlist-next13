import { useCallback } from 'react';
import { useAtomValue } from 'jotai';

import { MAX_DESCRIPTION_PREVIEW_LENGTH } from '@/utils/constants';
import { isListDescriptionShowMoreAtom } from '../ListDescriptionEdit';

export const useShowMore = (text: string, maxLength = MAX_DESCRIPTION_PREVIEW_LENGTH) => {
  const isShowMore = useAtomValue(isListDescriptionShowMoreAtom);

  const enableShowMore = useCallback(() => {
    return text.length > maxLength || text.split('\n').length > 6;
  }, [text.length, maxLength]);

  const getText = useCallback(() => {
    if (isShowMore) return text;
    if (text.length > maxLength) return text.slice(0, maxLength) + '...';
    if (text.split('\n').length > 6) return text.split('\n').slice(0, 6).join('\n') + '...';
    return text;
  }, [isShowMore, text]);

  return {
    enableShowMore,
    text: enableShowMore() ? getText() : text,
  };
};
