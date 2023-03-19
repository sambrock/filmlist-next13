import { Fragment } from 'react';

import { getInitialListData } from '@/server/list/getInitialListData';
import { ListHeader } from '@/components/list/ListHeader';
import { ListTitleStatic } from '@/components/list/ListTitle/ListTitleStatic';
import { ListDescriptionStatic } from '@/components/list/ListDescription/ListDescriptionStatic';
import { ListMoviesStatic } from '@/components/list/ListMovies/ListMoviesStatic';
import { Header } from '@/components/layout/Header';
import { ListActionsStatic } from '@/components/list/ListActions/ListActionsStatic';

type StaticListPageProps = {
  params: {
    listId: string;
  };
};

const StaticListPage = async ({ params }: StaticListPageProps) => {
  const { initialData, listCount } = await getInitialListData(params.listId);

  return (
    <Fragment>
      <Header />
      <main className="container mx-auto">
        <div className="grid gap-4">
          <ListHeader
            actions={<ListActionsStatic />}
            title={<ListTitleStatic title={initialData?.title || ''} />}
            description={<ListDescriptionStatic description={initialData?.description || ''} />}
          />
          <ListMoviesStatic
            listId={params.listId}
            listCount={listCount}
            initialMovies={JSON.stringify(initialData?.movies.map((m) => m.movie) || [])}
          />
        </div>
      </main>
    </Fragment>
  );
};

export default StaticListPage;