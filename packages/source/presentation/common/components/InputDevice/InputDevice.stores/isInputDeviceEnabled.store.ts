import { atom } from 'nanostores';

export const isInputDeviceStore = atom(true);

export const enableInputDevice = (): void => {
  isInputDeviceStore.set(true);
};

export const disableInputDevice = (): void => {
  isInputDeviceStore.set(false);
};
