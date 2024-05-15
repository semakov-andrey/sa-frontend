import { atom } from 'nanostores';

import { isKeyOfObject, isset } from '@/utils/guards';

import { type IGamepadHandlersStore, type THandler } from '@/types/stores';

export const gamepadHandlersInitialValue = { current: {} };

export const gamepadHandlersStore = atom<IGamepadHandlersStore>(gamepadHandlersInitialValue);

export const addGamepadEventListener = (button: string, handler: THandler): void => {
  const currentHandlers = gamepadHandlersStore.get().current;
  const existHandlers = isKeyOfObject(currentHandlers, button) ? currentHandlers[button] : undefined;
  currentHandlers[button] = [ ...isset(existHandlers) ? existHandlers : [], handler ];
};

export const removeGamepadEventListener = (button: string, handler: THandler): void => {
  const currentHandlers = gamepadHandlersStore.get().current;
  const existHandlers = isKeyOfObject(currentHandlers, button) ? currentHandlers[button] : undefined;
  currentHandlers[button] = [ ...isset(existHandlers) ? existHandlers.filter((existHandler: THandler) => existHandler !== handler) : [] ];
};
