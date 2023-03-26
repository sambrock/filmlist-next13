import { Fragment } from 'react';

import { getInitialListStoreData } from '@/server/list/getInitialListStoreData';
import { InitializeClient } from './InitializeClient';
import { createListToken, setListTokenCookie } from '@/server/cookies/list';
import { EditListPage } from './EditListPage';
import { InitializeStore } from './InitializeStore';

type EditListPageProps = {
  params: {
    listId: string;
  };
  searchParams: {
    t?: string;
  };
};

const Index = async ({ params, searchParams }: EditListPageProps) => {
  const { initialData, listCount, listMovieIds } = await getInitialListStoreData(params.listId);

  const isTokenValid = searchParams.t === initialData?.token;
  if (!isTokenValid) {
    return <div>no match</div>;
  }

  const listTokenCookie = setListTokenCookie(createListToken(params.listId));

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
