import jwt from 'jsonwebtoken';

import { handler } from '@/server/handler';
import { generateNanoid } from '@/utils';

const SESSION_ID = 'rqnttla8wpq9';

export default handler({
  async post(req, res) {
    const session = {
      sessionId: SESSION_ID,
    };

    const sessionToken = jwt.sign(session, process.env.JWT_SECRET as string);

    return res
      .status(204)
      .setHeader('Set-Cookie', `session_token=${sessionToken}; Path=/; SameSite=Strict; Secure; HttpOnly;`)
      .end();
  },
});
