import { getInitialListData } from '@/server/list/getInitialListData';
import { ListHeader } from '@/components/list/ListHeader';
import { ListTitleStatic } from '@/components/list/ListTitle/ListTitleStatic';
import { ListDescriptionStatic } from '@/components/list/ListDescription/ListDescriptionStatic';
import { ListMoviesStatic } from '@/components/list/ListMovies/ListMoviesStatic';

type StaticListPageProps = {
  params: {
    listId: string;
  };
};

const StaticListPage = async ({ params }: StaticListPageProps) => {
  const { initialData, listCount } = await getInitialListData(params.listId);

  return (
    <main>
      <div className="grid gap-4">
        <ListHeader
          actions={null}
          title={<ListTitleStatic title={initialData?.title || ''} />}
          description={<ListDescriptionStatic description={initialData?.description || ''} />}
        />
        <ListMoviesStatic initialMovies={JSON.stringify(initialData?.movies.map((m) => m.movie) || [])} />
      </div>
    </main>
  );
};

export default StaticListPage;
