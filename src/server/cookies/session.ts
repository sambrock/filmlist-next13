import { SESSION_TOKEN_NAME } from '@/constants';
import { signToken, verifyToken } from '@/utils/jwt';
import { Session } from '../session/initializeSession';

export const setSessionTokenCookie = (token: string) =>
  `${SESSION_TOKEN_NAME}=${token}; Path=/; SameSite=Lax; Secure; Max-Age=31536000`;

export const createSessionToken = (session: Session) => signToken(session);

export const verifySessionToken = (token: string | undefined) => verifyToken(token) as Session | null;
