export const filterAsync = async <Item>(
  list: Array<Item>,
  callback: (item: Item, index: number, array: Array<Item>) => Promise<boolean>
): Promise<Array<Item>> => {
  const result: Array<Item> = [];

  for await (const [ index, item ] of list.entries()) {
    const filterResult = await callback(item, index, list);
    if (filterResult) result.push(item);
  }

  return result;
};
