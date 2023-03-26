import { LIST_TOKEN_NAME } from '@/constants';
import { signToken, verifyToken } from '@/utils/token';

export const setListTokenCookie = (token: string) =>
  `${LIST_TOKEN_NAME}=${token}; Path=/; SameSite=Lax; Secure; Max-Age=31536000`;

export const createListToken = (listId: string) => signToken({ listId });

export const verifyListToken = (token: string | undefined) => verifyToken(token) as { listId: string } | null;
