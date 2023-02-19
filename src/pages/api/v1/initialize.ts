import { handler } from '@/server/handler';
import { initializeSession } from '@/server/session/initializeSession';
import { createSessionToken, setSessionTokenCookie } from '@/server/session/sessionToken';

export default handler({
  async post(req, res) {
    const session = await initializeSession();

    return res
      .status(204)
      .setHeader('Set-Cookie', setSessionTokenCookie(createSessionToken(session)))
      .end();
  },
});
