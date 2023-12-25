export const isset = <T>(u?: T): u is T =>
  typeof u !== 'undefined';

export const iswritten = <T>(u: T | null): u is T =>
  u !== null;

export const isexists = <T>(u?: T | null): u is T =>
  isset(u) && iswritten(u);

export const isTypeObject = (u: unknown): u is Record<ObjectKey, unknown> =>
  typeof u === 'object' && u !== null && !Array.isArray(u);

export const isTypeArray = (u: unknown): u is unknown[] =>
  Array.isArray(u);

export const isTypeFunction = (u: unknown): u is Function =>
  typeof u === 'function';

export const isTypeNumber = (u: unknown): u is number =>
  typeof u === 'number';

export const isTypeString = (u: unknown): u is string =>
  typeof u === 'string';

export const isTypeBoolean = (u: unknown): u is boolean =>
  typeof u === 'boolean';

export const isEmptyObject = (u: unknown): boolean =>
  isTypeObject(u) && Object.keys(u).length === 0;

export const isEmptyArray = (u: unknown): boolean =>
  isTypeArray(u) && u.length === 0;

export const isEmptyNumber = (u: unknown): boolean =>
  u === 0;

export const isEmptyString = (u: unknown): boolean =>
  u === '';

export const isEmptyBoolean = (u: unknown): boolean =>
  u === false;

export const isFilledObject = (u: unknown): boolean =>
  isTypeObject(u) && !isEmptyObject(u);

export const isNonEmptyArray = <T>(array: T[]): array is NonEmptyArray<T> =>
  array.length !== 0;

export const isFilledArray = (u: unknown): boolean =>
  isTypeArray(u) && !isEmptyArray(u);

export const isFilledNumber = (u: unknown): u is number =>
  isTypeNumber(u) && !isEmptyNumber(u);

export const isFilledString = (u: unknown): u is string =>
  isTypeString(u) && !isEmptyString(u);

export const isFilledBoolean = (u: unknown): u is boolean =>
  isTypeBoolean(u) && !isEmptyBoolean(u);

export const isKeyOfObject = <T>(u: T, key: ObjectKey): key is keyof T =>
  isTypeObject(u) && Object.prototype.hasOwnProperty.call(u, key);

export const cast = <T, E = unknown>(u: E): T => u as unknown as T;
