import { useEffect, useRef } from 'react';

export const useAsyncUpdateEffect = (
  func: (isMounted: () => boolean) => Promise<void>,
  deps: unknown[]
): void => {
  const inited = useRef(false);

  useEffect(() => {
    if (!inited.current) {
      inited.current = true;
    } else {
      let isMounted = true;
      const maybePromise = func(() => isMounted);
      Promise.resolve(maybePromise);

      return () => {
        isMounted = false;
      };
    }
  }, deps);
};
