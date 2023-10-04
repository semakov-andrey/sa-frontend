import { useEffect, useRef } from 'react';

import { isTypeFunction } from '@sa-frontend/application/utilities/typeGuards.utilities';

export type UpdateCallback = () => (void | (() => void));

export const useUpdateEffect = (callback: UpdateCallback, deps: Array<unknown>): void => {
  const inited = useRef(false);
  const unmount = useRef((): void => undefined);

  useEffect(() => {
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
