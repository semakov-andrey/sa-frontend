import { useGamepadEvent } from './useGamepadEvent.hook';
import { useKeyboardEvent } from './useKeyboardEvent.hook';

export const useInputDeviceEvent = (
  keys: OneOrMore<string>,
  buttons: OneOrMore<string>,
  handler: () => void,
  options: { skip?: boolean, timeout?: number } = {}
): void => {
  useKeyboardEvent(keys, handler, options);
  useGamepadEvent(buttons, handler, options);
};
