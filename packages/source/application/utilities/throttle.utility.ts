import { isTypeNumber } from './typeGuards.utility';

export type TTrottleFunction<T> = (...args: Array<T>) => void;
export type TTrottleReturn<T> = (...args: Array<T>) => void;

export const throttle = <T>(fn: TTrottleFunction<T>, timeout: number): TTrottleReturn<T> => {
  let timer: number | undefined;

  return (...args: Array<T>): void => {
    if (isTypeNumber(timer)) {
      return;
    }

    fn(...args);
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      window.clearTimeout(timer);
      timer = undefined;
    }, timeout);
  };
};
