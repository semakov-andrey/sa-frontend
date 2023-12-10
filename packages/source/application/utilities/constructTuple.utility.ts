export const constructTuple = <Item, Count extends number = 0>(item: Item, count: Count): Tuple<Item, Count> =>
  [ ...new Array<Item>(count) ].fill(item) as Tuple<Item, Count>;
