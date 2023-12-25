export const mapAsync = async <Item, Result>(
  list: Item[],
  callback: (item: Item, index: number, array: Item[]) => Promise<Result>
): Promise<Result[]> => {
  const result: Result[] = [];

  for await (const [ index, item ] of list.entries()) {
    result.push(await callback(item, index, list));
  }

  return result;
};
