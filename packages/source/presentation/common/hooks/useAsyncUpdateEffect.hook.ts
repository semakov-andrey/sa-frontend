import { useEffect, useRef } from 'react';

export type IsMounted = () => boolean;
export type Setup = (isMounted: IsMounted) => Promise<void>;

export const useAsyncUpdateEffect = (func: Setup, deps: unknown[]): void => {
  const inited = useRef(false);

  useEffect(() => {
    if (!inited.current) {
      inited.current = true;
    } else {
      let isMounted = true;
      func(() => isMounted);

      return () => {
        isMounted = false;
      };
    }
  }, deps);
};
