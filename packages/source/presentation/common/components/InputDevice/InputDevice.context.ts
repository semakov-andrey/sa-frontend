import { createContext } from 'react';

export interface InputDevice {
  isContext: boolean;
  isEnabled: boolean;
  isGamepadConnected: boolean;
  setEnabled: (_: boolean) => void;
  setGamepadConnected: (_: boolean) => void;
}

export const InputDeviceContext = createContext<InputDevice>({
  isContext: false,
  isEnabled: true,
  isGamepadConnected: false,
  setEnabled: (_: boolean) => undefined,
  setGamepadConnected: (_: boolean) => undefined
});
