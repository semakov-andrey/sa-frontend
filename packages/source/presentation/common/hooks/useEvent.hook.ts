import { useRef, useLayoutEffect } from 'react';

export const useEvent = <T extends (...args: never[]) => unknown>(fn: T): T => {
  const ref = useRef<[T, T]>(
    [
      fn,
      ((...args: Parameters<T>): ReturnType<T> => ref[0](...args) as ReturnType<T>) as T
    ]
  ).current;

  useLayoutEffect(() => {
    ref[0] = fn;
  });

  return ref[1];
};
