import { useUpdateInfluence } from './useUpdateInfluence.hook';

export type Setup = () => (void | (() => void));

export const useDebounceInfluence = (
  callback: Setup,
  deps: unknown[],
  timeout: number
): void => {
  useUpdateInfluence(() => {
    const handler = window.setTimeout(() => {
      callback();
    }, timeout);

    return () => {
      window.clearTimeout(handler);
    };
  }, [ timeout, ...deps ]);
};
