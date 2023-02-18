import { cookies } from 'next/headers';

import { MovieSearch } from '@/components/MovieSearch';

export default function Home() {
  // const sessionToken = cookies().get('session_token');

  return (
    <main className="grid grid-cols-2">
      <MovieSearch />
    </main>
  );
}
