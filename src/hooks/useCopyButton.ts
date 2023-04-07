import { useCallback, useEffect, useState } from 'react';

export const useCopyButton = (text: string) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isCopied]);

  const copyButtonProps = useCallback(() => {
    return {
      onClick: () => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
      },
    };
  }, [text]);

  return {
    isCopied,
    copyButtonProps,
  };
};
