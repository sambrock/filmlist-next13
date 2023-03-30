import useMutation, { type SWRMutationConfiguration } from 'swr/mutation';

import { api } from '@/api';
import type { POST_CreateList } from '@/pages/api/v1/createList';

export const useCreateList = (opts?: SWRMutationConfiguration<POST_CreateList['data'], unknown>) => {
  return useMutation(['create', Date.now()], () => api.post('/api/v1/createList', null), opts);
};
