import { useUpdateInfluence } from './useUpdateInfluence.hook';

export type UpdateCallback = () => (void | (() => void));

export const useDebounceInfluence = (
  callback: UpdateCallback,
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
