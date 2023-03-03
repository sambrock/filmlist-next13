import { Fragment } from 'react';
import { cookies } from 'next/headers';

import { getInitialListStoreData, InitialListStoreData } from '@/server/list/getInitialListStoreData';
import { verifySessionToken } from '@/server/session/sessionToken';
import { InitListStore } from '../../InitListStore';
import { InitSession } from '../../InitSession';
import { SESSION_TOKEN_NAME } from '@/utils/constants';
import { ListTitleEdit } from '@/components/list/ListTitle/ListTitleEdit';
import { Header } from '@/components/layout/Header';
import { MovieSearch } from '@/components/search/MovieSearchInput';
import { ListMoviesEdit } from '@/components/list/ListMovies/ListMoviesEdit';

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
    <Fragment>
      <Header search={<MovieSearch />} />
      {/* <div className="fixed top-0 left-0 h-16 w-full bg-teal-800">
        <div className="container mx-auto">
        </div>
      </div> */}
      <main className="">
        <div className="grid gap-6">
          <div>{/* buttons */}</div>
          <ListTitleEdit initialTitle={initialListData?.title || ''} />
          <ListMoviesEdit initialMovies={initialListData?.movies.map((m) => m.movie) || []} />
        </div>

        {/* <div className="fixed bottom-8 left-1/2 w-full max-w-lg -translate-x-1/2">
          <MovieSearch />
        </div> */}

        <InitListStore initialListData={JSON.stringify(initialListData)} />
        <InitSession isSession={sessionTokenCookie?.value ? true : false} />
      </main>
    </Fragment>
  );
};

export default Index;
