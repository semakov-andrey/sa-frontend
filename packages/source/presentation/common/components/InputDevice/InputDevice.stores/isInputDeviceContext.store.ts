import { atom } from 'nanostores';

export const isInputDeviceContextStore = atom(false);

export const setInputDeviceContext = (isInputDeviceContext: boolean): void => {
  isInputDeviceContextStore.set(isInputDeviceContext);
};
