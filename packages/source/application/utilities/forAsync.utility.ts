export const forAsync = async <Item>(
  list: Item[],
  callback: (item: Item, index: number, array: Item[]) => Promise<void>
): Promise<void> => {
  for await (const [ index, item ] of list.entries()) {
    await callback(item, index, list);
  }
};
