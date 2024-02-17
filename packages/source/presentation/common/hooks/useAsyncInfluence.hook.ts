import { useInfluence } from './useInfluence.hook';

export type IsMounted = () => boolean;
export type Setup = (isMounted: IsMounted) => Promise<void>;

export const useAsyncInfluence = (func: Setup, deps: unknown[]): void => {
  useInfluence(() => {
    let isMounted = true;
    func(() => isMounted);

    return () => {
      isMounted = false;
    };
  }, deps);
};
