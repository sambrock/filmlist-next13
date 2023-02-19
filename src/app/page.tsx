import { cookies } from 'next/headers';
import type { List, ListMovies, Movie } from '@prisma/client';

import { MovieSearch } from '@/components/MovieSearch';
import { getInitialListStoreData } from '@/server/list/getInitialListStoreData';
import { readSessionToken } from '@/server/session/sessionToken';
import { InitListStore } from './InitListStore';
import { InitSession } from './InitSession';

const Index = async () => {
  let initialListData: (List & { movies: (ListMovies & { movie: Movie })[] }) | null = null;
  const sessionTokenCookie = cookies().get('session_token');
  if (sessionTokenCookie?.value) {
    const session = readSessionToken(sessionTokenCookie.value);
    if (session?.listId) {
      initialListData = await getInitialListStoreData(session.listId);
    }
  }

  return (
    <main className="grid grid-cols-2">
      <MovieSearch />

      {/* @ts-expect-error Server Component */}
      <InitListStore initialListData={JSON.stringify(initialListData)} />
      <InitSession isSession={sessionTokenCookie?.value ? true : false} />
    </main>
  );
};

export default Index;
