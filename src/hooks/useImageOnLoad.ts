import { useCallback, useRef, useState } from 'react';

export const useImageOnLoad = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const initialTime = useRef(Date.now());

  const handleOnLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const imgClassName = useCallback(() => {
    const timeElapsed = Date.now() - initialTime.current;

    if (timeElapsed < 250) return 'opacity-100';
    return `transition-opacity ${isLoaded ? 'opacity-100' : 'opacity-0'}`;
  }, [isLoaded]);

  return { handleOnLoad, imgClassName };
};
