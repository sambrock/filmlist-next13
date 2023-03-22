'use client';

import { EllipsisOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useAtomValue } from 'jotai';

import { ButtonIcon } from '../common/ButtonIcon';
import { Menu } from '../common/Menu';
import { isMovieSearchMobileActiveAtom, MovieSearchMobile, MovieSearchMobileButton } from '../search/MovieSearchMobile';

export const HeaderActionButtonsEdit = ({ listId }: { listId: string }) => {
  const isMovieSearchMobileActive = useAtomValue(isMovieSearchMobileActiveAtom);

  return (
    <div className="flex w-full items-center gap-2 md:ml-auto md:w-auto">
      <Menu
        className="block w-full md:hidden"
        menuButton={<MovieSearchMobileButton />}
        menu={
          <div className="fixed top-2 left-0 w-full px-2">
            <MovieSearchMobile />
          </div>
        }
        isActive={isMovieSearchMobileActive}
      />
      <ButtonIcon variant="transparent" icon={<ShareAltOutlined />} />
      <ButtonIcon variant="transparent" icon={<EllipsisOutlined />} />
    </div>
  );
};
