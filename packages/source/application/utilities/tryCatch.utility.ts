import { isset } from './typeGuards.utilities';

export type TryCatch<T> = {
  data: T
} | {
  error: unknown
};

export const tryCatch = async <T>(promise: Promise<T>): Promise<TryCatch<T>> => {
  try {
    return { data: await promise };
  } catch (error: unknown) {
    return { error };
  }
};

export const hasData = <T>(result: TryCatch<T>): result is { data: T } =>
  'data' in result && isset(result.data);

export const hasError = <T>(result: TryCatch<T>): result is { error: unknown } =>
  'error' in result;
