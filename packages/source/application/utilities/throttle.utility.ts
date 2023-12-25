import { isTypeNumber } from './typeGuards.utilities';

export type TrottleFunction<T> = (...args: T[]) => void;
export type TrottleReturn<T> = (...args: T[]) => void;

export const throttle = <T>(fn: TrottleFunction<T>, timeout: number): TrottleReturn<T> => {
  let timer: number | undefined;

  return (...args: T[]): void => {
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
