export type OriginalMap<Item, Result> = (value: Item, index: number, array: Array<Item>) => Result;

export const mapTuple = <List extends Tuple, Count extends number = List['length'], Result = unknown>(
  list: List,
  callback: (value: List[number], index: TupleIndices<Count>, array: List) => Result
): Tuple<Result, Count> =>
  list.map(callback as OriginalMap<List[number], Result>) as Tuple<Result, Count>;
