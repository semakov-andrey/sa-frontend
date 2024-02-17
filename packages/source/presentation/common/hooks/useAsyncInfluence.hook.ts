import { useInfluence } from './useInfluence.hook';

export type IsMounted = () => boolean;
export type Setup = (isMounted: IsMounted) => Promise<void>;
export type Options = { skip?: boolean };

export const useAsyncInfluence = (
  func: Setup,
  deps: unknown[],
  opts: Options = {}
): void => {
  const { skip = false } = opts;

  useInfluence(() => {
    let isMounted = true;
    func(() => isMounted);

    return () => {
      isMounted = false;
    };
  }, deps, { skip });
};
