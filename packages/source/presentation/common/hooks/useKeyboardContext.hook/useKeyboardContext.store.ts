import { atom } from 'nanostores';

export const isKeyboardContextStore = atom(false);

export const setKeyboardContext = (isKeyboardContext: boolean): void => {
  isKeyboardContextStore.set(isKeyboardContext);
};
