import { COMBINATION_SEPARATOR, SPECIAL_KEYS } from './InputDevice.constants/keyboard.constants';

export const getButton = (event: KeyboardEvent): string =>
  [
    ...event.ctrlKey ? [ SPECIAL_KEYS.CTRL ] : [],
    ...event.altKey ? [ SPECIAL_KEYS.OPTION ] : [],
    ...event.shiftKey ? [ SPECIAL_KEYS.SHIFT ] : [],
    ...event.metaKey ? [ SPECIAL_KEYS.CMD ] : [],
    event.code
  ].join(COMBINATION_SEPARATOR);
