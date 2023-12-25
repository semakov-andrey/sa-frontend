export const filterAsync = async <Item>(
  list: Item[],
  callback: (item: Item, index: number, array: Item[]) => Promise<boolean>
): Promise<Item[]> => {
  const result: Item[] = [];

  for await (const [ index, item ] of list.entries()) {
    const filterResult = await callback(item, index, list);
    if (filterResult) result.push(item);
  }

  return result;
};
