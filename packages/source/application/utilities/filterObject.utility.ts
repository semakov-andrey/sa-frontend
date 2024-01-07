export const filterObjectByKeys = <T extends object, D extends (keyof T)[]>(o: T, allowedKeys: D): Pick<T, D[number]> => {
  const entries: EntryOf<T>[] = Object.entries(o).filter((entry: EntryOf<T>) => allowedKeys.includes(entry[0]));
  return Object.fromEntries(entries);
};

export const filterObjectByValues = <T extends object, D extends T[keyof T][]>(o: T, forbiddenValues: D): T => {
  const entries: EntryOf<T>[] = Object.entries(o).filter((entry: EntryOf<T>) => !forbiddenValues.includes(entry[1]));
  return Object.fromEntries(entries);
};
