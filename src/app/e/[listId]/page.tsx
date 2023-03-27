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

// Required to access the search params
// https://beta.nextjs.org/docs/api-reference/file-conventions/page#searchparams-optional
export const dynamic = 'force-dynamic';

const Index = async (props: any) => {
  // Broken type here, doesn't pass next build type checking
  // TODO: need to fix this
  const { params, searchParams } = props as EditListPageProps;
  const { initialData, listCount, listMovieIds } = await getInitialListStoreData(params.listId);

  const isTokenValid = searchParams.t === initialData?.token;
  if (!isTokenValid) {
    return <div>no match</div>;
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
