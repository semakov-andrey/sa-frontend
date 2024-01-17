import { isKeyOfObject, isTypeObject, isset, isTypeObjectOrArray } from '@sa-frontend/application/utilities/typeGuards.utilities';

type TArray = unknown[];

interface IDeepMergeOptions {
  arrayMerge?: <T, U>(array1: T & TArray, array2: U & TArray) => T & U & TArray;
};

export const arrayMerge = <T, U>(array1: T & TArray, array2: U & TArray): T & U & TArray => array1.concat(array2) as T & U & TArray;

export const replaceArrayMerge = <T, U>(array1: T, array2: U): T & U & TArray => array2 as T & U & TArray;

export const insertionArrayMerge = <T, U>(array1: T & TArray, array2: U & TArray): T & U & TArray => {
  array2.forEach((item: unknown, index: number) => {
    array1[index] = item;
  });
  return [ ...array1 ] as T & U & TArray;
};

export const objectMerge = <T extends object, U extends object>(
  object1: T, object2: U, options: IDeepMergeOptions
): T & U => {
  const result = Object.fromEntries(
    Object.entries(object1).map(([ key, value ]: EntryOf<T>) => [
      key,
      isTypeObject(value) ? deepMerge({}, value) : value
    ])
  ) as ObjectType;

  Object.entries(object2).forEach(([ key, value ]: EntryOf<U>) => {
    if (typeof key === 'symbol') return;
    if (isTypeObjectOrArray(value)) {
      result[key] = isKeyOfObject(result, key) && isTypeObjectOrArray(result[key])
        ? deepMerge(result[key] as ObjectType, value, options)
        : isTypeObject(value) ? deepMerge({}, value) : value;
    } else {
      result[key] = value;
    }
  });

  return result as T & U;
};

export const deepMerge = <T extends object | unknown[], U extends object | unknown[]>(
  object1: T,
  object2: U,
  options: IDeepMergeOptions = {}
): T & U => {
  const object1IsArray = Array.isArray(object1);
  const object2IsArray = Array.isArray(object2);

  if (object1IsArray !== object2IsArray) {
    return deepMerge((object2IsArray ? [] : {}) as T, object2);
  }
  if (object1IsArray && object2IsArray) {
    return isset(options.arrayMerge)
      ? options.arrayMerge(object1, object2)
      : arrayMerge(object1, object2);
  }

  return objectMerge(object1, object2, options);
};
