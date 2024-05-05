import { isset } from './typeGuards.utility.js';

export const tryCatch = async (promise) => {
  try {
    return { data: await promise };
  } catch (error) {
    return { error };
  }
};

export const hasData = (result) => 'data' in result && isset(result.data);

export const hasError = (result) => 'error' in result;
