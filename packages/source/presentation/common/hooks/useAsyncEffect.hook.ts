import { useEffect } from 'react';

export type IsMounted = () => boolean;
export type Setup = (isMounted: IsMounted) => Promise<void>;

export const useAsyncEffect = (func: Setup, deps: unknown[]): void => {
  useEffect(() => {
    let isMounted = true;
    func(() => isMounted);

    return () => {
      isMounted = false;
    };
  }, deps);
};
