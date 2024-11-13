import { atom } from 'nanostores';

export const isGamepadConnectedStore = atom(false);

export const setGamepadConnected = (isGamepadConnectedS: boolean): void => {
  isGamepadConnectedStore.set(isGamepadConnectedS);
};
