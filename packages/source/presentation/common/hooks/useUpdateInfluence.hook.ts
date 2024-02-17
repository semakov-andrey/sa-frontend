import { useRef } from 'react';

import { isTypeFunction } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { useInfluence } from './useInfluence.hook';

export type UpdateCallback = () => (void | (() => void));

export const useUpdateInfluence = (callback: UpdateCallback, deps: unknown[]): void => {
  const inited = useRef(false);
  const unmount = useRef((): void => undefined);

  useInfluence(() => {
    if (!inited.current) {
      inited.current = true;
    } else {
      const callbackReturn = callback();
      if (isTypeFunction(callbackReturn)) {
        unmount.current = callbackReturn;
      }
    }

    return () => {
      unmount.current();
    };
  }, deps);
};
