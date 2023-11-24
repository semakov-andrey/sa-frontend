export const filterObject = <T extends object>(o: T, keys: Array<string>): T => {
  const entries: Array<EntryOf<T>> = Object.entries(o).filter((entry: EntryOf<T>) => keys.includes(entry[0]));
  return Object.fromEntries(entries);
};
