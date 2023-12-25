export const filterObject = <T extends object, D extends (keyof T)[]>(o: T, keys: D): Pick<T, D[number]> => {
  const entries: EntryOf<T>[] = Object.entries(o).filter((entry: EntryOf<T>) => keys.includes(entry[0]));
  return Object.fromEntries(entries);
};
