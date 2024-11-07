import { useEvent } from '../../hooks/useEvent.hook';
import { useInfluence } from '../../hooks/useInfluence.hook';

import { GAMEPAD_KEYS } from './InputDevice.constants/gamepad.constants';
import { KEYBOARD_KEYS } from './InputDevice.constants/keyboard.constants';
import { useGamepad } from './InputDevice.hooks/useGamepad.hook';
import { useGamepadEvent } from './InputDevice.hooks/useGamepadEvent.hook';
import { useKeyboard } from './InputDevice.hooks/useKeyboard.hook';
import { useKeyboardEvent } from './InputDevice.hooks/useKeyboardEvent.hook';
import { setInputDeviceContext } from './InputDevice.stores/isInputDeviceContext.store';

export interface InputDeviceProps {
  keys: string[];
  buttons: string[];
  children: EntireElement;
}

export const InputDevice = (props: InputDeviceProps): EntireElement => {
  const { keys, buttons, children } = props;

  const predefinedKeys = Object.values(KEYBOARD_KEYS);
  const predefinedButtons = Object.values(GAMEPAD_KEYS);

  const resetKeyboardContext = useEvent(() => {
    setInputDeviceContext(false);
  });

  useKeyboardEvent([ ...predefinedKeys, ...keys ], () => {
    setInputDeviceContext(true);
  });

  useGamepadEvent([ ...predefinedButtons, ...buttons ], () => {
    setInputDeviceContext(true);
  });

  useGamepad();
  useKeyboard();

  useInfluence(() => {
    document.documentElement.addEventListener('mousemove', resetKeyboardContext);

    return (): void => {
      document.documentElement.removeEventListener('mousemove', resetKeyboardContext);
    };
  }, [ resetKeyboardContext ]);

  return children;
};
