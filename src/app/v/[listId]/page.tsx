import { Fragment } from 'react';

import { getInitialListData } from '@/server/list/getInitialListData';
import { ListHeader } from '@/components/list/ListHeader';
import { ListTitleStatic } from '@/components/list/ListTitle/ListTitleStatic';
import { ListDescriptionStatic } from '@/components/list/ListDescription/ListDescriptionStatic';
import { ListMoviesStatic } from '@/components/list/ListMovies/ListMoviesStatic';
import { Header } from '@/components/layout/Header';
import { MovieDetailsStatic } from '@/components/movie/MovieDetails/MovieDetailsStatic';
import { NotFound } from '@/components/layout/NotFound';
import { ListOptionsStatic } from '@/components/list/ListOptions/ListOptionsStatic';
import { DEFAULT_TITLE } from '@/constants';

type StaticListPageProps = {
  params: {
    listId: string;
  };
};

export async function generateMetadata({ params }: StaticListPageProps) {
  const { initialData } = await getInitialListData(params.listId);

  if (!initialData) {
    return {
      title: DEFAULT_TITLE('Not found'),
    };
  }
  return {
    title: DEFAULT_TITLE(initialData?.title || 'Untitled'),
  };
}

const StaticListPage = async ({ params }: StaticListPageProps) => {
  const { initialData, listCount, listMovieIds } = await getInitialListData(params.listId);

  if (!initialData) {
    return <NotFound />;
  }

  return (
    <Fragment>
      <Header
        buttons={
          <div className="flex items-center gap-2">
            <ListOptionsStatic listId={params.listId} />
          </div>
        }
      />
      <main>
        <div className="mt-6 grid gap-4">
          <ListHeader
            actions={null}
            title={<ListTitleStatic title={initialData?.title || ''} />}
            description={<ListDescriptionStatic description={initialData?.description || ''} />}
          />
          <ListMoviesStatic
            listId={params.listId}
            listCount={listCount}
            initialMovies={JSON.stringify(initialData?.movies.map((m) => m.movie) || [])}
          />
          <MovieDetailsStatic listMovieIds={listMovieIds} />
        </div>
      </main>
    </Fragment>
  );
};

export default StaticListPage;
