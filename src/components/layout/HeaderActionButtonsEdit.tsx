'use client';

import { useAtom } from 'jotai';
import { EllipsisOutlined } from '@ant-design/icons';

import { ButtonIcon } from '../common/ButtonIcon';
import { Menu } from '../common/Menu';
import { isMovieSearchMobileActiveAtom, MovieSearchMobile, MovieSearchMobileButton } from '../search/MovieSearchMobile';
import { isShareMenuOpenAtom, ShareMenu, ShareMenuButton } from '../share/ShareMenu';

export const HeaderActionButtonsEdit = ({ listId, editToken }: { listId: string; editToken: string }) => {
  const [isMovieSearchMobileActive, setIsMovieSearchMobileActive] = useAtom(isMovieSearchMobileActiveAtom);
  const [isShareMenuOpen, setIsShareMenuOpen] = useAtom(isShareMenuOpenAtom);

  return (
    <div className="flex w-full items-center gap-2 md:ml-auto md:w-auto">
      <Menu
        className="block w-full md:hidden"
        isOpen={isMovieSearchMobileActive}
        setIsOpen={setIsShareMenuOpen}
        menuButton={<MovieSearchMobileButton />}
        menu={() => (
          <div className="fixed top-2 left-0 w-full px-2">
            <MovieSearchMobile />
          </div>
        )}
      />
      <Menu
        isOpen={isShareMenuOpen}
        setIsOpen={setIsShareMenuOpen}
        menuButton={<ShareMenuButton />}
        relative={false}
        menu={(ref) => (
          <div ref={ref} className="absolute right-0">
            <ShareMenu listId={listId} editToken={editToken} />
          </div>
        )}
      />
      <ButtonIcon variant="transparent" icon={<EllipsisOutlined />} />
    </div>
  );
};
