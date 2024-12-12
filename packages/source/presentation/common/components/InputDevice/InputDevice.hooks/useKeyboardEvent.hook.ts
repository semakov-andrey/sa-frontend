import { useStore } from '@nanostores/react';
import { useRef } from 'react';

import { throttle } from '@sa-frontend/application/utilities/throttle.utility';

import { useEvent } from '../../../hooks/useEvent.hook';
import { useInfluence } from '../../../hooks/useInfluence.hook';
import { isInputDeviceStore } from '../InputDevice.stores/isInputDeviceEnabled.store';
import { addKeyboardHandler, removeKeyboardHandler } from '../InputDevice.stores/keyboardHandlers.store';

export const useKeyboardEvent = (
  keys: OneOrMore<string>,
  handler: (event: KeyboardEvent) => void,
  { skip = false, timeout }: { skip?: boolean, timeout?: number } = {}
): void => {
  const isInputDevice = useStore(isInputDeviceStore);
  const skipHandling = skip || !isInputDevice;
  const { current: combinations } = useRef(Array.isArray(keys) ? keys : [ keys ]);
  const fn = useEvent(handler);

  useInfluence(() => {
    if (skipHandling) return;

    const trottledHandler = throttle(fn, timeout ?? 250);

    combinations.forEach((combination: string) => {
      addKeyboardHandler(combination, trottledHandler);
    });

    return (): void => {
      combinations.forEach((combination: string) => {
        removeKeyboardHandler(combination, trottledHandler);
      });
    };
  }, [ combinations, fn, skipHandling, timeout ]);
};
