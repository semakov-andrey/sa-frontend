import { useEffect, useRef, type EffectCallback } from 'react';

export const useCheckEffect = (callback: EffectCallback, deps: Array<unknown>): void => {
  const previousDeps = useRef(deps);

  useEffect(() => {
    previousDeps.current.forEach((dep: unknown, index: number) => {
      if (dep !== deps[index]) console.info(`Dep ${ index } changed`);
    });
    previousDeps.current = deps;
  }, deps);

  useEffect(callback, deps);
};
