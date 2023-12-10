export const mapAsync = async <Item, Result>(
  list: Array<Item>,
  callback: (item: Item, index: number, array: Array<Item>) => Promise<Result>
): Promise<Array<Result>> => {
  const result: Array<Result> = [];

  for await (const [ index, item ] of list.entries()) {
    result.push(await callback(item, index, list));
  }

  return result;
};
