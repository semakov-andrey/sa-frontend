import { dequal } from 'dequal';
import { useRef } from 'react';

import { useInfluence } from './useInfluence.hook';

type Setup = () => void | (() => void);

export const useDeepCompareMemoize = (value: unknown[]): unknown[] => {
  const ref = useRef(value);

  if (!dequal(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
};

export const useDeepInfluence = (
  callback: Setup,
  deps: unknown[]
): void => {
  useInfluence(callback, useDeepCompareMemoize(deps));
};

