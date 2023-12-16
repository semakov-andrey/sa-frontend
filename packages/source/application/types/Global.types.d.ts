type FunctionType<T = unknown, R = unknown> = (...args: Array<T>) => R;

type ObjectKey = string | number | symbol;

type ObjectType<T = unknown> = Record<ObjectKey, T>;

type ObjectDefType<K extends ObjectKey, T = unknown> = Record<K, T>;

type Nullable<T> = T | null;

type Optional<T> = T | undefined;

type Absent<T> = T | null | undefined;

type NonOptional<T> = T extends undefined ? never : T;

type NonNullable<T> = T extends null ? never : T;

type NonAbsent<T> = T extends null | undefined ? never : T;

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

interface ReadonlyArray<T> {
  includes<U>(searchElement: U, fromIndex?: number): U extends T ? boolean : false;
}

type Modify<T, R> = Omit<T, KeyOf<R>> & R;

type PromiseResolve<T> = (value: T) => void;

type PromiseReject<T = undefined> = (reason?: T) => void;

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

type Tuple<Item = unknown, Count extends number = 0, Internal extends Array<unknown> = []> =
  Count extends 0
    ? [Item, ...Array<Item>]
    : Internal extends { length: Count } ? Internal : Tuple<Item, Count, [...Internal, Item]>;

type TupleIndices<Count extends number, C extends Array<unknown> = [], R = 0> =
  C['length'] extends Count ? R : TupleIndices<Count, [...C, 0], C['length'] | R>;

type TupleIndicesByArray<T extends Tuple> =
  Extract<keyof T, `${ number }`> extends `${ infer N extends number }` ? N : never;

type TupleLength<T extends Tuple> =
  T extends { length: infer L } ? L : never;

type IsTuple<T> = T extends Tuple ? true : false;
