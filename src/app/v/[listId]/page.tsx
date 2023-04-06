import { Fragment } from 'react';

import { getInitialListData } from '@/server/list/getInitialListData';
import { ListHeader } from '@/components/list/ListHeader';
import { ListTitleStatic } from '@/components/list/ListTitle/ListTitleStatic';
import { ListDescriptionStatic } from '@/components/list/ListDescription/ListDescriptionStatic';
import { ListMoviesStatic } from '@/components/list/ListMovies/ListMoviesStatic';
import { Header } from '@/components/layout/Header';
import { MovieDetailsStatic } from '@/components/movie/MovieDetails/MovieDetailsStatic';

type StaticListPageProps = {
  params: {
    listId: string;
  };
};

const StaticListPage = async ({ params }: StaticListPageProps) => {
  const { initialData, listCount, listMovieIds  } = await getInitialListData(params.listId);

  return (
    <Fragment>
      <Header />
      <main>
        <div className="grid gap-4">
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
