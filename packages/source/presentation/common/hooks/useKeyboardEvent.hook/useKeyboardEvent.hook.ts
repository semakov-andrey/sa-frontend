import { throttle } from '@sa-frontend/application/utilities/throttle.utility';

import { useEvent } from '../useEvent.hook';
import { useInfluence } from '../useInfluence.hook';

import { COMBINATION_SEPARATOR } from './useKeyboardEvent.constants';
import { getAdditionalCondition } from './useKeyboardEvent.utility';

export const useKeyboardEvent = (
  keys: string | string[],
  handler: (event: KeyboardEvent) => void,
  { skip, timeout }: { skip?: boolean, timeout?: number } = {}
): void => {
  const fn = useEvent(handler);

  useInfluence(() => {
    if (Boolean(skip)) return;

    const combinations = Array.isArray(keys) ? keys : [ keys ];
    const trottledHandler = throttle(fn, timeout ?? 250);
    const callback = (event: KeyboardEvent): void => {
      if (event.target instanceof HTMLInputElement
        || event.target instanceof HTMLTextAreaElement) return;

      for (const combination of combinations) {
        const keys = combination.split(COMBINATION_SEPARATOR);
        const button = keys[keys.length === 1 ? 0 : 1];
        const isAdditionalCondition = getAdditionalCondition(keys, event);

        if (event.code === button && isAdditionalCondition) {
          event.preventDefault();
          event.stopPropagation();
          trottledHandler(event);
        }
      }
    };
    document.documentElement.addEventListener('keydown', callback);

    return (): void => {
      document.documentElement.removeEventListener('keydown', callback);
    };
  }, [ fn, keys, skip, timeout ]);
};
