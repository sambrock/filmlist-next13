import { Fragment } from 'react';

import { Header } from '@/components/layout/Header';
import type { InitialListStoreData } from '@/server/list/getInitialListStoreData';
import { ListTitleEdit } from '@/components/list/ListTitle/ListTitleEdit';
import { ListMoviesEdit, ListMoviesEditObservable } from '@/components/list/ListMovies/ListMoviesEdit';
import { MovieSearch } from '@/components/search/MovieSearch';
import { ListActionsEdit } from '@/components/list/ListActions/ListActionsEdit';
import { ListHeader } from '@/components/list/ListHeader';
import { ListDescriptionEdit } from '@/components/list/ListDescription/ListDescriptionEdit';
import { parseMarkdown } from '@/utils/parseMarkdown';
import { HeaderActionButtonsEdit } from '@/components/layout/HeaderActionButtonsEdit';
import { MAX_LIST_MOVIES } from '@/constants';

export type EditListPageProps = {
  initialData: InitialListStoreData;
  listCount: number;
};

export const EditListPage = async ({ initialData, listCount }: EditListPageProps) => {
  if (!initialData) return null;
  return (
    <Fragment>
      <Header
        search={<MovieSearch />}
        buttons={<HeaderActionButtonsEdit listId={initialData.id} editToken={initialData.token} />}
      />
      <main>
        <div className="grid gap-4">
          <ListHeader
            actions={<ListActionsEdit />}
            title={<ListTitleEdit initialTitle={initialData.title} />}
            description={
              <ListDescriptionEdit initialDescription={parseMarkdown(initialData.description || '') || ''} />
            }
          />
          <ListMoviesEdit
            initialMovies={JSON.stringify(initialData?.movies.map((m) => m.movie) || [])}
            observerLoader={<ListMoviesEditObservable listId={initialData.id} isActive={listCount > MAX_LIST_MOVIES} />}
          />
        </div>
      </main>
    </Fragment>
  );
};
