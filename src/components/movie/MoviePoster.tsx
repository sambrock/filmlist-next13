'use client';

import { clsx } from 'clsx';

import { useImageOnLoad } from '@/hooks/useImageOnLoad';
import { MOVIE_IMAGE_URL } from '@/constants';

export const MoviePoster = ({ posterPath, ...props }: React.ComponentProps<'img'> & { posterPath: string }) => {
  const { handleOnLoad, imgClassName } = useImageOnLoad();

  return (
    <div className={clsx("aspect-poster rounded-sm bg-black-500", props.className)}>
      <img
        {...props}
        className={clsx('h-full w-full rounded-sm', imgClassName())}
        src={MOVIE_IMAGE_URL['poster']['w92'] + posterPath}
        onLoad={handleOnLoad}
      />
    </div>
  );
};
