type FunctionType<T = unknown, R = unknown> = (...args: Array<T>) => R;

type ObjectKey = string | number | symbol;

type ObjectType<T = unknown> = Record<ObjectKey, T>;

type ObjectDefType<K extends ObjectKey, T = unknown> = Record<K, T>;

type Nullable<T> = T | null;

type Optional<T> = T | undefined;

type Absent<T> = T | null | undefined;

type OneOrMore<T> = T | Array<T>;

type ArrayInnerType<T> = T extends Array<infer R> ? R : never;

type NonEmptyArray<T> = [T, ...Array<T>];

type KeyOf<T> = keyof T;

type ValueOf<T> = T[KeyOf<T>];

type EntryOf<T> = { [K in KeyOf<T>]: [K, T[K]] }[KeyOf<T>];

interface ObjectConstructor {
  keys<T>(o: T): T extends Array<unknown> ? string : Array<KeyOf<T>>;

  values<T>(o: T): T extends Array<infer R> ? R : Array<T[KeyOf<T>]>;

  entries<T>(o: T): T extends Array<infer R> ? Array<[ string, R ]> : Array<EntryOf<T>>;

  fromEntries<T>(entries: Array<EntryOf<T>>): T;
}

interface Array<T> {
  includes<U>(searchElement: U, fromIndex?: number): U extends T ? boolean : false;

  map<D extends NonEmptyArray<T>, U>(
    this: D,
    callbackfn: (value: T, index: number, array: NonEmptyArray<T>) => U
  ): NonEmptyArray<U>;

  reduce<D extends NonEmptyArray<T>, U>(
    this: D,
    callbackfn: (
      previousValue: NonEmptyArray<U>, currentValue: T, currentIndex: number, array: NonEmptyArray<T>
    ) => NonEmptyArray<U>,
    initialValue: Array<U>
  ): NonEmptyArray<U>;

  flat<D extends NonEmptyArray<T>>(
    this: D
  ): T;
}

type Modify<T, R> = Omit<T, KeyOf<R>> & R;

type PromiseResolve<T> = (value: T) => void;

type PromiseReject<T> = (reason?: T) => void;

type UnionToIntersection<U> =
  (U extends unknown ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

type OmitX<T, K> = T extends T
  ? T extends K
    ? never
    : T
  : never;

type UnionToTuple<T, K = T> = [T] extends [never]
  ? []
  : T extends T
    ? [T, ...UnionToTuple<OmitX<K, T>>]
    : [];

type ClassConstructor<T> = {
  new (...args: Array<unknown>): T
};
