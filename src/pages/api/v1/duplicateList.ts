import { z } from 'zod';

import type { Api } from '@/api/api.types';
import { handler, HandlerError } from '@/server/handler';
import { createList } from '@/server/list/createList';
import { duplicateList } from '@/server/list/duplicateList';
import { awaitTimeout } from '@/utils';

export type POST_DuplicateList = Api.PostRoute<{
  url: '/api/v1/duplicateList';
  body: { listId: string };
  data: Awaited<ReturnType<typeof createList>>;
}>;

const bodySchema = z.object({
  listId: z.string(),
});

export default handler({
  async post(req, res) {
    // const session = verifySessionToken(req.cookies.session_token);
    // if (!session) throw new HandlerError(400, 'Invalid session token');

    const body = bodySchema.safeParse(req.body);
    if (!body.success) throw new HandlerError(400, 'Invalid body');

    const list = await createList();
    await duplicateList(body.data.listId, list.id);

    await awaitTimeout(2000);

    return res.status(201).send(list);
  },
});
