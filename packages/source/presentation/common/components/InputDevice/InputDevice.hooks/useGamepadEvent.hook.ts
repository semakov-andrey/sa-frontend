import { useStore } from '@nanostores/react';
import { useRef } from 'react';

import { throttle } from '@sa-frontend/application/utilities/throttle.utility';

import { useEvent } from '../../../hooks/useEvent.hook';
import { useInfluence } from '../../../hooks/useInfluence.hook';
import { addGamepadHandler, removeGamepadHandler, type Handler } from '../InputDevice.stores/gamepadHandlers.store';
import { isInputDeviceStore } from '../InputDevice.stores/isInputDeviceEnabled.store';

export const useGamepadEvent = (
  buttons: OneOrMore<string>,
  handler: Handler,
  { skip = false, timeout }: { skip?: boolean, timeout?: number } = {}
): void => {
  const isInputDevice = useStore(isInputDeviceStore);
  const skipHandling = skip || !isInputDevice;
  const { current: combinations } = useRef(Array.isArray(buttons) ? buttons : [ buttons ]);
  const fn = useEvent(handler);

  useInfluence(() => {
    if (skipHandling) return;

    const trottledHandler = throttle(fn, timeout ?? 250);

    combinations.forEach((combination: string) => {
      addGamepadHandler(combination, trottledHandler);
    });

    return (): void => {
      combinations.forEach((combination: string) => {
        removeGamepadHandler(combination, trottledHandler);
      });
    };
  }, [ combinations, fn, skipHandling, timeout ]);
};
