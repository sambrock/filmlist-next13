import { Fragment } from 'react';
import { cookies } from 'next/headers';

import { verifySessionToken } from '@/server/session/sessionToken';
import { SESSION_TOKEN_NAME } from '@/constants';
import EditListPage from './[listId]/edit/page';
import { InitSession } from './InitSession';

const Index = () => {
  const sessionTokenCookie = cookies().get(SESSION_TOKEN_NAME);
  let session = undefined;
  if (sessionTokenCookie?.value) {
    session = verifySessionToken(sessionTokenCookie.value);
  }

  const listId = session?.listId || '';

  return (
    <Fragment>
      {/* @ts-expect-error Server Component */}
      <EditListPage params={{ listId }} />
      <InitSession isSession={sessionTokenCookie?.value ? true : false} />
    </Fragment>
  );
};

export default Index;
