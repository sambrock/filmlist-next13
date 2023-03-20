import { useCallback } from 'react';

import { MOVIE_IMAGE_URL } from '@/constants';

export const usePreloadStaticPoster = (posterPath: string) => {
  const preloadImg = useCallback(() => {
    // Use setTimeout to allow time for image to be saved on the backend
    // before attempting to load it
    // This is a hacky solution, but it works
    setTimeout(() => {
      const img = new Image();

      img.src = MOVIE_IMAGE_URL['poster']['w342']['default'] + posterPath;
    }, 1500);
  }, [posterPath]);

  return { preloadImg };
};
