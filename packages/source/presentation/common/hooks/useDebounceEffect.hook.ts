import { useUpdateEffect } from './useUpdateEffect.hook';

export type UpdateCallback = () => (void | (() => void));

export const useDebounceEffect = (
  callback: UpdateCallback,
  deps: Array<unknown>,
  timeout: number
): void => {
  useUpdateEffect(() => {
    const handler = window.setTimeout(() => {
      callback();
    }, timeout);

    return () => {
      window.clearTimeout(handler);
    };
  }, [ timeout, ...deps ]);
};
