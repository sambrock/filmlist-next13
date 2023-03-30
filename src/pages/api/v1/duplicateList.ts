import { z } from 'zod';

import { Api } from '@/api/api.types';
import { createSessionToken, setSessionTokenCookie, verifySessionToken } from '@/server/cookies/session';
import { handler, HandlerError } from '@/server/handler';
import { createList } from '@/server/list/createList';
import { updateSessionListId } from '@/server/session/updateSession';
import { duplicateList } from '@/server/list/duplicateList';

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
    const session = verifySessionToken(req.cookies.session_token);
    if (!session) throw new HandlerError(400, 'Invalid session token');

    const body = bodySchema.safeParse(req.body);
    if (!body.success) throw new HandlerError(400, 'Invalid body');

    const list = await createList();

    const updatedSession = await updateSessionListId(session.id, list.id);

    await duplicateList(body.data.listId, list.id);

    return res
      .status(201)
      .setHeader('Set-Cookie', setSessionTokenCookie(createSessionToken(updatedSession)))
      .send(list);
  },
});
