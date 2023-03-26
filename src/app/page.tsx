import { Fragment } from 'react';
import { cookies } from 'next/headers';

import { SESSION_TOKEN_NAME } from '@/constants';
import { createSessionToken, setSessionTokenCookie, verifySessionToken } from '@/server/cookies/session';
import { createList } from '@/server/list/createList';
import { initializeSession } from '@/server/session/initializeSession';
import { InitializeStore } from './e/[listId]/InitializeStore';
import { getInitialListStoreData } from '@/server/list/getInitialListStoreData';
import { EditListPage } from './e/[listId]/EditListPage';
import { InitializeClient } from './InitializeClient';

const Index = async () => {
  const sessionToken = cookies().get(SESSION_TOKEN_NAME)?.value || '';
  const listId = verifySessionToken(sessionToken)?.listId || '';

  if (!sessionToken || !listId) {
    const list = await createList();
    const session = await initializeSession(list.id);

    const sessionTokenCookie = setSessionTokenCookie(createSessionToken(session));

    return (
      <Fragment>
        {/* @ts-expect-error Server Component */}
        <EditListPage initialData={{ ...list, movies: [] }} listCount={0} />

        <InitializeStore initialListData={JSON.stringify({ ...list, movies: [] })} initialListMovieIds={[]} />
        <InitializeClient sessionTokenCookie={sessionTokenCookie} />
      </Fragment>
    );
  }

  const { initialData, listCount, listMovieIds } = await getInitialListStoreData(listId);

  return (
    <Fragment>
      {/* @ts-expect-error Server Component */}
      <EditListPage initialData={initialData} listCount={listCount} />

      <InitializeStore initialListData={JSON.stringify(initialData)} initialListMovieIds={listMovieIds || []} />
      <InitializeClient sessionTokenCookie={setSessionTokenCookie(sessionToken)} />
    </Fragment>
  );
};

export default Index;
