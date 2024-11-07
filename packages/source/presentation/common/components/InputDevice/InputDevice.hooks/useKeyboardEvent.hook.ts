import { useRef } from 'react';

import { throttle } from '@sa-frontend/application/utilities/throttle.utility';

import { useEvent } from '../../../hooks/useEvent.hook';
import { useInfluence } from '../../../hooks/useInfluence.hook';
import { addKeyboardHandler, removeKeyboardHandler } from '../InputDevice.stores/keyboardHandlers.store';

export const useKeyboardEvent = (
  keys: OneOrMore<string>,
  handler: (event: KeyboardEvent) => void,
  { skip, timeout }: { skip?: boolean, timeout?: number } = {}
): void => {
  const { current: combinations } = useRef(Array.isArray(keys) ? keys : [ keys ]);
  const fn = useEvent(handler);

  useInfluence(() => {
    if (Boolean(skip)) return;

    const trottledHandler = throttle(fn, timeout ?? 250);

    combinations.forEach((combination: string) => {
      addKeyboardHandler(combination, trottledHandler);
    });

    return (): void => {
      combinations.forEach((combination: string) => {
        removeKeyboardHandler(combination, trottledHandler);
      });
    };
  }, [ combinations, fn, skip, timeout ]);
};
