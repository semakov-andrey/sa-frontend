import { useEffect } from 'react';

import { gamepadHandlersStore } from '@/services/stores/gamepad/gamepadHandlers.store';
import { gamepadIndexStore, setGamepadIndex } from '@/services/stores/gamepad/gamepadIndex.store';
import { isexists, isKeyOfObject, isset } from '@/utils/guards';
import { throttleButton } from '@/utils/throttle';

import { GAMEPAD_BUTTONS } from './useGamepad.const';

import type { TButtonIndex } from '@/types/gamepad';
import type { THandler } from '@/types/stores';

const throttledHandler = throttleButton((existHandlers: Array<THandler>) => {
  existHandlers.forEach((handler: THandler) => handler());
}, 250);

const cycleHandler = (): number => {
  const index = gamepadIndexStore.get().current;
  const eventHandlers = gamepadHandlersStore.get().current;
  if (!isset(index)) {
    return window.requestAnimationFrame(cycleHandler);
  }

  const gamepads = navigator.getGamepads();
  const gamepad = gamepads[index];
  if (!isexists(gamepad) || !gamepad.buttons.some((e: GamepadButton) => e.pressed)) {
    return window.requestAnimationFrame(cycleHandler);
  }

  const buttonIndex = gamepad.buttons.findIndex((e: GamepadButton) => e.pressed) as TButtonIndex | -1;
  if (buttonIndex === -1) {
    return window.requestAnimationFrame(cycleHandler);
  }

  const button = GAMEPAD_BUTTONS[buttonIndex];
  const existHandlers = isKeyOfObject(eventHandlers, button) ? eventHandlers[button] : undefined;
  if (!isset(existHandlers)) {
    return window.requestAnimationFrame(cycleHandler);
  }

  throttledHandler(button, existHandlers);

  return window.requestAnimationFrame(cycleHandler);
};

export const useGamepad = (): void => {
  useEffect(() => {
    window.addEventListener('gamepadconnected', (event: GamepadEvent) => {
      setGamepadIndex(event.gamepad.index);
    });

    window.addEventListener('gamepaddisconnected', () => {
      setGamepadIndex(undefined);
    });

    const animationFrame = window.requestAnimationFrame(cycleHandler);

    return (): void => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);
};
