import { Fragment } from 'react';

import type { InitialListStoreData } from '@/server/list/getInitialListStoreData';
import { ListTitleEdit } from '@/components/list/ListTitle/ListTitleEdit';
import { ListMoviesEdit, ListMoviesEditObservable } from '@/components/list/ListMovies/ListMoviesEdit';
import { ListActionsEdit } from '@/components/list/ListActions/ListActionsEdit';
import { ListHeader } from '@/components/list/ListHeader';
import { ListDescriptionEdit } from '@/components/list/ListDescription/ListDescriptionEdit';
import { MAX_LIST_MOVIES } from '@/constants';
import { Header } from '@/components/layout/Header';
import { MovieSearch } from '@/components/search/MovieSearch';
import { ListShare } from '@/components/list/ListShare/ListShare';
import { SaveIndicator } from '@/components/layout/SaveIndicator';
import { ClientKeyboardShortcuts } from './ClientKeyboardShortcuts';
import { ListOptionsEdit } from '@/components/list/ListOptions/ListOptionsEdit';
import { MovieSearchMobile } from '@/components/search/MovieSearchMobile/MovieSearchMobile';

export type EditListPageProps = {
  initialData: InitialListStoreData;
  listCount: number;
};

export const EditListPage = async ({ initialData, listCount }: EditListPageProps) => {
  return (
    <Fragment>
      <Header
        saveIndicator={<SaveIndicator />}
        search={<MovieSearch />}
        buttons={
          <div className="flex items-center gap-2">
            <MovieSearchMobile />
            <ListShare />
            <ListOptionsEdit listId={initialData.id} />
          </div>
        }
      />
      <main>
        <div className="grid gap-4">
          <ListHeader
            actions={<ListActionsEdit />}
            title={<ListTitleEdit initialTitle={initialData.title} />}
            description={
              <ListDescriptionEdit key={initialData.id} initialDescription={initialData.description || ''} />
            }
          />
          <ListMoviesEdit
            initialMovies={JSON.stringify(initialData?.movies.map((m) => m.movie) || [])}
            observerLoader={<ListMoviesEditObservable listId={initialData.id} isActive={listCount > MAX_LIST_MOVIES} listCount={listCount} />}
          />
        </div>
      </main>
      <ClientKeyboardShortcuts />
    </Fragment>
  );
};
