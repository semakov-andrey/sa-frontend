import { isTypeNumber } from './typeGuards.utilities';

export const throttle = <T extends (...args: Parameters<T>) => void>(
  fn: T,
  timeout: number
): T => {
  let timer: number | undefined;

  const throttled = (...args: Parameters<T>): void => {
    if (isTypeNumber(timer)) return;

    fn(...args);
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      window.clearTimeout(timer);
      timer = undefined;
    }, timeout);
  };

  return throttled as T;
};
