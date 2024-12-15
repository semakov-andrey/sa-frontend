import React, { useMemo, useState } from 'react';

import { useEvent } from '../../hooks/useEvent.hook';
import { useInfluence } from '../../hooks/useInfluence.hook';

import { GAMEPAD_KEYS } from './InputDevice.constants/gamepad.constants';
import { KEYBOARD_KEYS } from './InputDevice.constants/keyboard.constants';
import { InputDeviceContext } from './InputDevice.context';
import { useGamepad } from './InputDevice.hooks/useGamepad.hook';
import { useGamepadEvent } from './InputDevice.hooks/useGamepadEvent.hook';
import { useKeyboard } from './InputDevice.hooks/useKeyboard.hook';
import { useKeyboardEvent } from './InputDevice.hooks/useKeyboardEvent.hook';

export interface InputDeviceProps {
  keys: string[];
  buttons: string[];
  children: EntireElement;
}

export const InputDevice = (props: InputDeviceProps): JSX.Element => {
  const { keys, buttons, children } = props;

  const [ isContext, setContext ] = useState(false);
  const [ isEnabled, setEnabled ] = useState(true);
  const [ isGamepadConnected, setGamepadConnected ] = useState(false);

  const predefinedKeys = Object.values(KEYBOARD_KEYS);
  const predefinedButtons = Object.values(GAMEPAD_KEYS);

  const resetKeyboardContext = useEvent(() => {
    setContext(false);
  });

  useKeyboardEvent([ ...predefinedKeys, ...keys ], () => {
    setContext(true);
  });

  useGamepadEvent([ ...predefinedButtons, ...buttons ], () => {
    setContext(true);
  });

  useGamepad();
  useKeyboard();

  useInfluence(() => {
    document.documentElement.addEventListener('mousemove', resetKeyboardContext);

    return (): void => {
      document.documentElement.removeEventListener('mousemove', resetKeyboardContext);
    };
  }, [ resetKeyboardContext ]);

  const value = useMemo(() => ({
    isContext,
    isEnabled,
    isGamepadConnected,
    setEnabled,
    setGamepadConnected
  }), [ isContext, isEnabled, isGamepadConnected ]);

  return (
    <InputDeviceContext.Provider value={ value }>
      { children }
    </InputDeviceContext.Provider>
  );
};
