import { Fragment } from 'react';
import Link from 'next/link';

import { DEFAULT_TITLE } from '@/constants';
import { Button } from '../common/Button';
import { Header } from './Header';

export const NotFound = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <div className="mt-12 flex w-full flex-col items-center justify-center">
          <h1 className="text-7xl font-black text-white/80 md:text-9xl">404</h1>
          <div className="flex items-center gap-1 text-sm font-medium text-white/40">
            <span className="mt-[3px] mr-2">There&lsquo;s nothing here.</span>

            <Link href="/">
              <Button tone="neutral-blur" size="small">
                Create a list
              </Button>
            </Link>
          </div>

          <img src="/not_found.gif" alt="Page not found" className="mt-12" />
        </div>
      </main>
    </Fragment>
  );
};
