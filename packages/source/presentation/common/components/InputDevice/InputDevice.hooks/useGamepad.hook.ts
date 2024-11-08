import { useStore } from '@nanostores/react';
import { useState } from 'react';

import { isexists, isset } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { useEvent } from '../../../hooks/useEvent.hook';
import { useInfluence } from '../../../hooks/useInfluence.hook';
import { GAMEPAD_BUTTONS, GAMEPAD_KEYS } from '../InputDevice.constants/gamepad.constants';
import { gamepadHandlersStore, type Handler } from '../InputDevice.stores/gamepadHandlers.store';

export const useGamepad = (): void => {
  const gamepadHandlers = useStore(gamepadHandlersStore);
  const [ gamepadIndex, setGamepadIndex ] = useState<number>();

  const next = useEvent((): number => window.requestAnimationFrame(catchPressings));

  const getButton = useEvent((pressedButtonIndex: number) =>
    GAMEPAD_BUTTONS[pressedButtonIndex]);

  const getStick = useEvent((y1: number, y2: number) => {
    let stick: string | undefined;
    if (y1 < -0.75) stick = GAMEPAD_KEYS.LEFT_STICK_UP;
    if (y1 > 0.75) stick = GAMEPAD_KEYS.LEFT_STICK_DOWN;
    if (y2 < -0.75) stick = GAMEPAD_KEYS.RIGHT_STICK_UP;
    if (y2 > 0.75) stick = GAMEPAD_KEYS.RIGHT_STICK_DOWN;
    return stick;
  });

  const catchPressings = useEvent(() => {
    if (!isset(gamepadIndex)) return next();

    const gamepad = navigator.getGamepads()[gamepadIndex];
    if (!isexists(gamepad)) return next();

    const { axes: [ , y1 = 0,, y2 = 0 ], buttons } = gamepad;
    const pressedButtonIndex = buttons.findIndex((e: GamepadButton) => e.pressed);

    const button = pressedButtonIndex !== -1 ? getButton(pressedButtonIndex) : getStick(y1, y2);
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
