import { useStore } from '@nanostores/react';
import { useState } from 'react';

import { isexists, isset } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { useEvent } from '../../../hooks/useEvent.hook';
import { useInfluence } from '../../../hooks/useInfluence.hook';
import { GAMEPAD_BUTTONS } from '../InputDevice.constants/gamepad.constants';
import { gamepadHandlersStore, type Handler } from '../InputDevice.stores/gamepadHandlers.store';

export const useGamepad = (): void => {
  const gamepadHandlers = useStore(gamepadHandlersStore);
  const [ gamepadIndex, setGamepadIndex ] = useState<number>();

  const next = useEvent((): number => window.requestAnimationFrame(catchPressings));

  const catchPressings = useEvent(() => {
    if (!isset(gamepadIndex)) return next();

    const gamepad = navigator.getGamepads()[gamepadIndex];
    if (!isexists(gamepad)) return next();

    const pressedButtonIndex = gamepad.buttons.findIndex((e: GamepadButton) => e.pressed);
    if (pressedButtonIndex === -1) return next();

    const button = GAMEPAD_BUTTONS[pressedButtonIndex];
    if (!isset(button)) return next();

    const handlers = button in gamepadHandlers ? gamepadHandlers[button] : undefined;
    if (!isset(handlers)) return next();

    handlers.forEach((handler: Handler) => {
      handler();
    });

    return next();
  });

  useInfluence(() => {
    window.addEventListener('gamepadconnected', (event: GamepadEvent) => {
      setGamepadIndex(event.gamepad.index);
    });
    window.addEventListener('gamepaddisconnected', () => {
      setGamepadIndex(undefined);
    });

    const animationFrame = next();

    return (): void => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [ next ]);
};
