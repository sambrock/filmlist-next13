import { verifyListToken } from '../cookies/list';
import { verifySessionToken } from '../cookies/session';

export const authListRequest = (
  listId: string,
  sessionToken: string | undefined,
  listToken: string | undefined
): boolean => {
  if (!listId) return false;

  const sessionTokenData = verifySessionToken(sessionToken);
  const listTokenData = verifyListToken(listToken);

  return sessionTokenData?.listId === listId || listTokenData?.listId === listId;
};
