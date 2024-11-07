export const GAMEPAD_KEYS = {
  B: 'B',
  A: 'A',
  Y: 'Y',
  X: 'X',
  L: 'L',
  R: 'R',
  ZL: 'ZL',
  ZR: 'ZR',
  SELECT: 'Select',
  START: 'Start',
  LEFT_STICK: 'LeftStick',
  RIGHT_STICK: 'RightStick',
  UP: 'Up',
  DOWN: 'Down',
  LEFT: 'Left',
  RIGHT: 'Right'
} as const;

export const GAMEPAD_BUTTONS: Record<number, string> = {
  0: GAMEPAD_KEYS.B,
  1: GAMEPAD_KEYS.A,
  2: GAMEPAD_KEYS.Y,
  3: GAMEPAD_KEYS.X,
  4: GAMEPAD_KEYS.L,
  5: GAMEPAD_KEYS.R,
  6: GAMEPAD_KEYS.ZL,
  7: GAMEPAD_KEYS.ZR,
  8: GAMEPAD_KEYS.SELECT,
  9: GAMEPAD_KEYS.START,
  10: GAMEPAD_KEYS.LEFT_STICK,
  11: GAMEPAD_KEYS.RIGHT_STICK,
  12: GAMEPAD_KEYS.UP,
  13: GAMEPAD_KEYS.DOWN,
  14: GAMEPAD_KEYS.LEFT,
  15: GAMEPAD_KEYS.RIGHT
};
