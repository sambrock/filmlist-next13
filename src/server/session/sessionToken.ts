import jwt from 'jsonwebtoken';

import type { Session } from '@prisma/client';
import { SESSION_TOKEN_NAME } from '@/utils/constants';

export const createSessionToken = (session: Omit<Session, 'createdAt' | 'updatedAt'>) => {
  const sessionToken = jwt.sign(session, process.env.JWT_SECRET as string);

  return sessionToken;
};

export const setSessionTokenCookie = (sessionToken: string) => {
  return `${SESSION_TOKEN_NAME}=${sessionToken}; Path=/; SameSite=Strict; Secure; HttpOnly;`;
};

export const verifySessionToken = (sessionToken: string | undefined) => {
  if (!sessionToken) return null;
  return jwt.verify(sessionToken, process.env.JWT_SECRET as string) as Session;
};
