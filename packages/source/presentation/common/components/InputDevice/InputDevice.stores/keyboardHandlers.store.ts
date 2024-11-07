import { atom } from 'nanostores';

export type Handler = (event: KeyboardEvent) => void;

export type KeyboardHandlersStore = Record<string, Handler[]>;

export const keyboardHandlersStore = atom<KeyboardHandlersStore>({});

export const addKeyboardHandler = (key: string, handler: Handler): void => {
  const currentHandlers = keyboardHandlersStore.get();
  const existHandlers = key in currentHandlers ? currentHandlers[key] : undefined;
  keyboardHandlersStore.set({
    ...currentHandlers,
    [key]: [ ...existHandlers ?? [], handler ]
  });
};

export const removeKeyboardHandler = (key: string, handler: Handler): void => {
  const currentHandlers = keyboardHandlersStore.get();
  const existHandlers = key in currentHandlers ? currentHandlers[key] : undefined;
  keyboardHandlersStore.set({
    ...currentHandlers,
    [key]: existHandlers?.filter((existHandler: Handler) => existHandler !== handler) ?? []
  });
};
