import { useRef, type EffectCallback } from 'react';

import { useInfluence } from './useInfluence.hook';

export const useCheckInfluence = (callback: EffectCallback, deps: unknown[]): void => {
  const previousDeps = useRef(deps);

  useInfluence(() => {
    previousDeps.current.forEach((dep: unknown, index: number) => {
      if (dep !== deps[index]) console.info(`Dep ${ index } changed`);
    });
    previousDeps.current = deps;
  }, deps);

  useInfluence(callback, deps);
};
