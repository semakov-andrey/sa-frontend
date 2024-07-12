import { useRef } from 'react';

import { useInfluence } from './useInfluence.hook';

export type IsMounted = () => boolean;
export type Setup = (isMounted: IsMounted) => Promise<void>;
export type Options = { skip?: boolean };

export const useAsyncUpdateInfluence = (
  func: Setup,
  deps: unknown[],
  opts: Options = {}
): void => {
  const inited = useRef(false);
  const { skip = false } = opts;

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
  }, deps, { skip });
};
