import { useRef } from 'react';

import { useInfluence } from './useInfluence.hook';

export type IsMounted = () => boolean;
export type Setup = (isMounted: IsMounted) => Promise<void>;

export const useAsyncUpdateInfluence = (func: Setup, deps: unknown[]): void => {
  const inited = useRef(false);

  useInfluence(() => {
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
