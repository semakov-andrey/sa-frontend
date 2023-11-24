export const filterObject = <T extends object, D extends Array<keyof T>>(o: T, keys: D): Pick<T, D[number]> => {
  const entries: Array<EntryOf<T>> = Object.entries(o).filter((entry: EntryOf<T>) => keys.includes(entry[0]));
  return Object.fromEntries(entries);
};
