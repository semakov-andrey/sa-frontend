import { atom } from 'nanostores';

export type Handler = () => void;

export type GamepadHandlersStore = Record<string, Handler[]>;

export const gamepadHandlersStore = atom<GamepadHandlersStore>({});

export const addGamepadHandler = (button: string, handler: Handler): void => {
  const currentHandlers = gamepadHandlersStore.get();
  const existHandlers = button in currentHandlers ? currentHandlers[button] : undefined;
  gamepadHandlersStore.set({
    ...currentHandlers,
    [button]: [ ...existHandlers ?? [], handler ]
  });
};

export const removeGamepadHandler = (button: string, handler: Handler): void => {
  const currentHandlers = gamepadHandlersStore.get();
  const existHandlers = button in currentHandlers ? currentHandlers[button] : undefined;
  gamepadHandlersStore.set({
    ...currentHandlers,
    [button]: existHandlers?.filter((existHandler: Handler) => existHandler !== handler) ?? []
  });
};
