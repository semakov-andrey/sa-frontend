import { atom } from 'nanostores';

import { type IGamepadStore } from '@/types/stores';

export const gamepadInitialValue = { current: undefined };

export const gamepadIndexStore = atom<IGamepadStore>(gamepadInitialValue);

export const setGamepadIndex = (value?: number): void => {
  gamepadIndexStore.get().current = value;
};
