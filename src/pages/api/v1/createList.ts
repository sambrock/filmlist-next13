import { Api } from '@/api/api.types';
import { handler, HandlerError } from '@/server/handler';
import { createList } from '@/server/list/createList';
import { createSessionToken, verifySessionToken, setSessionTokenCookie } from '@/server/session/sessionToken';
import { updateSession } from '@/server/session/updateSession';

export type POST_CreateList = Api.PostRoute<{
  url: '/api/v1/createList';
  body: null;
  data: Awaited<ReturnType<typeof createList>>;
}>;

export default handler({
  async post(req, res) {
    const session = verifySessionToken(req.cookies.session_token);
    if (!session) throw new HandlerError(400, 'Invalid session token');

    const list = await createList();

    const updatedSession = await updateSession(session.id, { listId: list.id });

    return res
      .status(201)
      .setHeader('Set-Cookie', setSessionTokenCookie(createSessionToken(updatedSession)))
      .send(list);
  },
});
