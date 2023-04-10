import { describe, expect, it, vi } from 'vitest';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import createListHandler from '@/pages/api/v1/createList';

describe('API /api/v1/createList', async () => {
  const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
    method: 'POST',
  });
  await createListHandler(req, res);

  it('Should return status code 201', async () => {
    expect(res._getStatusCode()).toBe(201);
  });

  it('Should return a list', async () => {
    expect(res._getData()).toBeTypeOf('object');
    expect(res._getData()).toHaveProperty('id');
    expect(res._getData()).toHaveProperty('title');
    expect(res._getData()).toHaveProperty('description');
  });
});
