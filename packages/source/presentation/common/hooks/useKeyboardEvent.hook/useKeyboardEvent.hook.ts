import { useEffect } from 'react';

import { throttle } from '@sa-frontend/application/utilities/throttle.utility';

import { useEvent } from '../useEvent.hook';

import { COMBINATION_SEPARATOR } from './useKeyboardEvent.constants';
import { getAdditionalCondition } from './useKeyboardEvent.utility';

export const useKeyboardEvent = (
  combination: string,
  handler: (event: KeyboardEvent) => void,
  { skip, timeout }: { skip?: boolean, timeout?: number } = {}
): void => {
  const fn = useEvent(handler);

  useEffect(() => {
    if (Boolean(skip)) return;
    const trottledHandler = throttle(fn, timeout ?? 250);
    const callback = (event: KeyboardEvent): void => {
      const keys = combination.split(COMBINATION_SEPARATOR);
      const button = keys[keys.length === 1 ? 0 : 1];
      const isAdditionalCondition = getAdditionalCondition(keys, event);

      if (event.code === button && isAdditionalCondition) {
        event.preventDefault();
        event.stopPropagation();
        trottledHandler(event);
      }
    };
    document.documentElement.addEventListener('keydown', callback);

    return (): void => {
      document.documentElement.removeEventListener('keydown', callback);
    };
  }, [ fn, combination, skip, timeout ]);
};
