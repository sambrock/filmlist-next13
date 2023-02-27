import { PostApiDefinition } from '@/api/api.types';
import { handler } from '@/server/handler';
import { initializeSession } from '@/server/session/initializeSession';
import { createSessionToken, setSessionTokenCookie } from '@/server/session/sessionToken';

export type POST_Initialize = PostApiDefinition<{
  url: '/api/v1/initialize';
  data: null;
  return: {};
}>;

export default handler({
  async post(req, res) {
    const session = await initializeSession();

    return res
      .status(200)
      .setHeader('Set-Cookie', setSessionTokenCookie(createSessionToken(session)))
      .send({});
  },
});
