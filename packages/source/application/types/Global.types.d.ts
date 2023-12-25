type FunctionType<T = unknown, R = unknown> = (...args: T[]) => R;

type ObjectKey = string | number | symbol;

type ObjectType<T = unknown> = Record<ObjectKey, T>;

type ObjectDefType<K extends ObjectKey, T = unknown> = Record<K, T>;

type Nullable<T> = T | null;

type Optional<T> = T | undefined;

type Absent<T> = T | null | undefined;

type NonOptional<T> = T extends undefined ? never : T;

type NonNullable<T> = T extends null ? never : T;

type NonAbsent<T> = T extends null | undefined ? never : T;

type OneOrMore<T> = T | T[];

type Item<List extends unknown[]> = List extends (infer Item)[] ? Item : never;

type NonEmpty<List extends unknown[]> = [Item<List>, ...Item<List>[]];

type KeyOf<T> = keyof T;

type ValueOf<T> = T[KeyOf<T>];

type EntryOf<T> = { [K in KeyOf<T>]: [K, T[K]] }[KeyOf<T>];

interface ObjectConstructor {
  keys<T>(o: T): T extends unknown[] ? string : KeyOf<T>[];

  values<T>(o: T): T extends (infer R)[] ? R : T[KeyOf<T>][];

  entries<T>(o: T): T extends (infer R)[] ? [ string, R ][] : EntryOf<T>[];

  fromEntries<T>(entries: EntryOf<T>[]): T;
}

interface Array<T> {
  includes<U>(searchElement: U, fromIndex?: number): U extends T ? boolean : false;

  map<D extends NonEmpty<T[]>, U>(
    this: D,
    callbackfn: (value: T, index: number, array: NonEmpty<T[]>) => U
  ): NonEmpty<U[]>;

  reduce<D extends NonEmpty<T[]>, U>(
    this: D,
    callbackfn: (
      previousValue: NonEmpty<U[]>, currentValue: T, currentIndex: number, array: NonEmpty<T[]>
    ) => NonEmpty<U[]>,
    initialValue: U[]
  ): NonEmpty<U[]>;

  flat<D extends NonEmpty<T[]>>(
    this: D
  ): T;
}

interface ReadonlyArray<T> {
  includes<U>(searchElement: U, fromIndex?: number): U extends T ? boolean : false;
}

type Modify<T, R> = Omit<T, KeyOf<R>> & R;

type PromiseResolve<T = undefined> = (value: T) => void;

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
  new (...args: unknown[]): T
};

type Tuple<Item = unknown, Count extends number = 0, Internal extends unknown[] = []> =
  Count extends 0
    ? [Item, ...Item[]]
    : Internal extends { length: Count } ? Internal : Tuple<Item, Count, [...Internal, Item]>;

type TupleIndices<Count extends number, C extends unknown[] = [], R = 0> =
  C['length'] extends Count ? R : TupleIndices<Count, [...C, 0], C['length'] | R>;

type TupleIndicesByArray<T extends Tuple> =
  Extract<keyof T, `${ number }`> extends `${ infer N extends number }` ? N : never;

type TupleLength<T extends Tuple> =
  T extends { length: infer L } ? L : never;

type IsTuple<T> = T extends Tuple ? true : false;
