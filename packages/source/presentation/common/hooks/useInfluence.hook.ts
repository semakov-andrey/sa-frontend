import { useEffect } from 'react';

export type IsMounted = () => boolean;
export type Setup = () => void | (() => void);
export type Options = { skip?: boolean };

export const useInfluence = (
  func: Setup,
  deps: unknown[],
  opts: Options = {}
): void => {
  const { skip = false } = opts;

  useEffect(() => {
    if (skip) return;
    const destroy = func();

    return destroy;
  }, [ ...deps, skip ]);
};
