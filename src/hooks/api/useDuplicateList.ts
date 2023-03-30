import useMutation, { type SWRMutationConfiguration } from 'swr/mutation';

import { api } from '@/api';
import type { POST_DuplicateList } from '@/pages/api/v1/duplicateList';

export const useDuplicateList = (
  listId: string,
  opts?: SWRMutationConfiguration<POST_DuplicateList['data'], unknown>
) => {
  return useMutation(['duplicate', listId, Date.now()], () => api.post('/api/v1/duplicateList', { listId }), opts);
};
