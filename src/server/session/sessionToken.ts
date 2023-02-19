import jwt from 'jsonwebtoken';

import { Session } from '@prisma/client';

export const createSessionToken = (session: Omit<Session, 'createdAt' | 'updatedAt'>) => {
  const sessionToken = jwt.sign(session, process.env.JWT_SECRET as string);

  return sessionToken;
};

export const setSessionTokenCookie = (sessionToken: string) => {
  return `session_token=${sessionToken}; Path=/; SameSite=Strict; Secure; HttpOnly;`;
};

export const readSessionToken = (sessionToken: string | undefined) => {
  if (!sessionToken) return null;
  return jwt.verify(sessionToken, process.env.JWT_SECRET as string) as Session;
};
