import { Fragment } from 'react';

import { getInitialListStoreData } from '@/server/list/getInitialListStoreData';
import { ListTitleEdit } from '@/components/list/ListTitle/ListTitleEdit';
import { Header } from '@/components/layout/Header';
import { MovieSearch } from '@/components/search/MovieSearch';
import { ListMoviesEdit } from '@/components/list/ListMovies/ListMoviesEdit';
import { InitListStore } from '@/app/InitListStore';

type ListPageProps = {
  params: {
    listId: string;
  };
};

const ListPage = async ({ params }: ListPageProps) => {
  const initialListData = await getInitialListStoreData(params.listId);

  return (
    <Fragment>
      <Header search={<MovieSearch />} />
      <main className="">
        <div className="grid gap-6">
          <div></div>
          <ListTitleEdit initialTitle={initialListData?.title || ''} />
          <ListMoviesEdit initialMovies={initialListData?.movies.map((m) => m.movie) || []} />
        </div>

        <InitListStore initialListData={JSON.stringify(initialListData)} />
      </main>
    </Fragment>
  );
};

export default ListPage;
