import { handler, HandlerError } from '@/server/handler';
import { createList } from '@/server/list/createList';
import { createSessionToken, readSessionToken, setSessionTokenCookie } from '@/server/session/sessionToken';

export default handler({
  async post(req, res) {
    const session = readSessionToken(req.cookies.session_token);
    if (!session) throw new HandlerError(400, 'Invalid session token');

    const list = await createList();

    return res
      .status(201)
      .setHeader(
        'Set-Cookie',
        setSessionTokenCookie(
          createSessionToken({
            ...session,
            listId: list.id,
          })
        )
      )
      .send(list);
  },
});
