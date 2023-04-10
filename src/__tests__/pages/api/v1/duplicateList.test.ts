import { describe, expect, it } from 'vitest';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import duplicateListHandler from '@/pages/api/v1/duplicateList';

const DUPLICATE_LIST_ID = '01hjd120833j';

describe('API /api/v1/duplicateList', async () => {
  const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
    method: 'POST',
    body: {
      listId: DUPLICATE_LIST_ID,
    },
  });
  await duplicateListHandler(req, res);

  it('Should return status code 201', async () => {
    expect(res._getStatusCode()).toBe(201);
  });

  it('Should return a list', async () => {
    expect(res._getData()).toBeTypeOf('object');
    expect(res._getData()).toHaveProperty('id');
    expect(res._getData()).toHaveProperty('title');
    expect(res._getData()).toHaveProperty('description');
  });

  it('Should return a list with a different id', async () => {
    expect(res._getData().id).not.toBe(DUPLICATE_LIST_ID);
  });
});
