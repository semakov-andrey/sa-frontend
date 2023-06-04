import type { TButtonIndex, TButtonValue } from '@/types/gamepad';

export const GAMEPAD_KEYS = {
  B: 'B',
  A: 'A',
  Y: 'Y',
  X: 'X',
  L: 'L',
  R: 'R',
  ZL: 'ZL',
  ZR: 'ZR',
  Select: 'Select',
  Start: 'Start',
  LeftStick: 'LeftStick',
  RightStick: 'RightStick',
  Up: 'Up',
  Down: 'Down',
  Left: 'Left',
  Right: 'Right'
} as const;

export const GAMEPAD_BUTTONS: Record<TButtonIndex, TButtonValue> = {
  0: GAMEPAD_KEYS.B,
  1: GAMEPAD_KEYS.A,
  2: GAMEPAD_KEYS.Y,
  3: GAMEPAD_KEYS.X,
  4: GAMEPAD_KEYS.L,
  5: GAMEPAD_KEYS.R,
  6: GAMEPAD_KEYS.ZL,
  7: GAMEPAD_KEYS.ZR,
  8: GAMEPAD_KEYS.Select,
  9: GAMEPAD_KEYS.Start,
  10: GAMEPAD_KEYS.LeftStick,
  11: GAMEPAD_KEYS.RightStick,
  12: GAMEPAD_KEYS.Up,
  13: GAMEPAD_KEYS.Down,
  14: GAMEPAD_KEYS.Left,
  15: GAMEPAD_KEYS.Right
};
