import { Fragment } from 'react';

import { getInitialListStoreData } from '@/server/list/getInitialListStoreData';
import { ListTitleEdit } from '@/components/list/ListTitle/ListTitleEdit';
import { Header } from '@/components/layout/Header';
import { ListMoviesEdit } from '@/components/list/ListMovies/ListMoviesEdit';
import { InitListStore } from '@/app/InitListStore';
import { MovieLoader } from './MovieLoader';
import { MovieSearch } from '@/components/search/MovieSearch';

type ListPageProps = {
  params: {
    listId: string;
  };
};

const ListPage = async ({ params }: ListPageProps) => {
  const { initialData, listCount } = await getInitialListStoreData(params.listId);

  return (
    <Fragment>
      <Header />
      <main className="">
        <div className="grid gap-6">
          <div></div>
          <ListTitleEdit initialTitle={initialData?.title || ''} />
          <ListMoviesEdit initialMovies={initialData?.movies.map((m) => m.movie) || []} />
        </div>

        <MovieLoader listId={params.listId} count={listCount} />

        <div className="fade-black-gradient-0 container sticky bottom-0 flex h-20 items-center justify-center">
          <div className="w-full max-w-md">
            <MovieSearch />
          </div>
        </div>

        <InitListStore initialListData={JSON.stringify(initialData)} />
      </main>
    </Fragment>
  );
};

export default ListPage;
