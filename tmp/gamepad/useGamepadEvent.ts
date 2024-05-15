import { useEffect } from 'react';

import {
  addGamepadEventListener,
  removeGamepadEventListener
} from '@/services/stores/gamepad/gamepadHandlers.store';

import { type THandler } from '@/types/stores';

export const useGamepadEvent = (button: string, handler: THandler, deps: Array<unknown>): void => {
  useEffect(() => {
    addGamepadEventListener(button, handler);

    return (): void => removeGamepadEventListener(button, handler);
  }, deps);
};
