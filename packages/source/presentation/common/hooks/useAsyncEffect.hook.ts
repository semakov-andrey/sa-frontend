import { useEffect } from 'react';

export const useAsyncEffect = (
  func: (isMounted: () => boolean) => Promise<void>,
  deps: Array<unknown>
): void => {
  useEffect(() => {
    let isMounted = true;
    const maybePromise = func(() => isMounted);
    Promise.resolve(maybePromise);

    return () => {
      isMounted = false;
    };
  }, deps);
};
