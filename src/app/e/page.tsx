import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { LIST_TOKEN_NAME, SESSION_TOKEN_NAME } from '@/constants';
import { verifySessionToken } from '@/server/cookies/session';
import { verifyListToken } from '@/server/cookies/list';

const Index = () => {
  const listToken = cookies().get(LIST_TOKEN_NAME)?.value || '';
  const listTokenData = verifyListToken(listToken);

  if (!listTokenData) return redirect('/');
  if (listTokenData?.listId) return redirect(`/e/${listTokenData.listId}?t=${listTokenData.token}`);

  const sessionToken = cookies().get(SESSION_TOKEN_NAME)?.value || '';
  const sessionData = verifySessionToken(sessionToken);

  if (!sessionData) return redirect('/');
  if (sessionData?.listId) return redirect(`/e/${sessionData.listId}?t=${sessionData.list?.token}`);

  return redirect('/');
};

export default Index;
