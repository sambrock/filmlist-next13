import { cookies } from 'next/headers';

import { MovieSearch } from '@/components/MovieSearch';
import { getInitialListStoreData, InitialListStoreData } from '@/server/list/getInitialListStoreData';
import { verifySessionToken } from '@/server/session/sessionToken';
import { InitListStore } from './InitListStore';
import { InitSession } from './InitSession';
import { SESSION_TOKEN_NAME } from '@/utils/constants';
import { ListTitle } from '@/components/list/ListTitle/ListTitle';

const Index = async () => {
  let initialListData: InitialListStoreData | null = null;
  const sessionTokenCookie = cookies().get(SESSION_TOKEN_NAME);
  if (sessionTokenCookie?.value) {
    const session = verifySessionToken(sessionTokenCookie.value);
    if (session?.listId) {
      initialListData = await getInitialListStoreData(session.listId);
    }
  }

  return (
    <main className="grid grid-cols-2">
      <div>
        <MovieSearch />
      </div>
      <div>
        <ListTitle initialTitle={initialListData?.title || ''} />
      </div>

      <InitListStore initialListData={JSON.stringify(initialListData)} />
      <InitSession isSession={sessionTokenCookie?.value ? true : false} />
    </main>
  );
};

export default Index;
