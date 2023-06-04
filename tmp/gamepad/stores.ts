import type { TPokemonGenderDiffForm, TPokemonRegion } from '@/types/common';

export interface ISettingsModal {
  name: 'settings';
};

export interface IPreviewModal {
  name: 'preview' | 'preview-close';
  payload: {
    id: number
  };
};

export type Modal = ISettingsModal | IPreviewModal;

export type TActiveSettingStore = 'regionals' | 'genders' | 'styles' | 'changes';

export interface IPreviewFilterStore {
  isShiny: boolean;
  showRegional: TPokemonRegion;
  showGender: TPokemonGenderDiffForm;
  showStyle: number;
  showChange: number;
};

export type THandler = () => void;

export type THandlers = Record<string, Array<THandler>>;

export interface IGamepadStore {
  current?: number;
};

export interface IGamepadHandlersStore {
  current: THandlers;
};
