import { Fragment } from 'react';

import { getInitialListStoreData } from '@/server/list/getInitialListStoreData';
import { InitializeClient } from './InitializeClient';
import { createListToken, setListTokenCookie } from '@/server/cookies/list';
import { EditListPage } from './EditListPage';
import { InitializeStore } from './InitializeStore';
import { NotFound } from '@/components/layout/NotFound';
import { DEFAULT_TITLE } from '@/constants';

type EditListPageProps = {
  params: {
    listId: string;
  };
  searchParams: {
    t?: string;
  };
};

// Required to access the search params
// https://beta.nextjs.org/docs/api-reference/file-conventions/page#searchparams-optional
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: EditListPageProps) {
  const { initialData } = await getInitialListStoreData(params.listId);

  if (!initialData) {
    return {
      title: DEFAULT_TITLE('Not found'),
    };
  }
  return {
    title: DEFAULT_TITLE(initialData?.title || 'Untitled'),
  };
}

const Index = async ({ params, searchParams }: EditListPageProps) => {
  const { initialData, listCount, listMovieIds } = await getInitialListStoreData(params.listId);

  if (!initialData) {
    return <NotFound />;
  }

  const isTokenValid = searchParams.t === initialData?.token;
  if (!isTokenValid) {
    return <NotFound />;
  }

  const listTokenCookie = setListTokenCookie(createListToken(params.listId, initialData?.token || ''));

  return (
    <Fragment>
      {/* @ts-expect-error Server Component */}
      <EditListPage initialData={initialData} listCount={listCount} />

      <InitializeClient listTokenCookie={listTokenCookie} />
      <InitializeStore initialListData={JSON.stringify(initialData)} initialListMovieIds={listMovieIds || []} />
    </Fragment>
  );
};

export default Index;
