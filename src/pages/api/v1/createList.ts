import { Api } from '@/api/api.types';
import { createSessionToken, setSessionTokenCookie, verifySessionToken } from '@/server/cookies/session';
import { handler, HandlerError } from '@/server/handler';
import { createList } from '@/server/list/createList';
import { updateSessionListId } from '@/server/session/updateSession';

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

    const updatedSession = await updateSessionListId(session.id, list.id);

    return res
      .status(201)
      .setHeader('Set-Cookie', setSessionTokenCookie(createSessionToken(updatedSession)))
      .send(list);
  },
});
