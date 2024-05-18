import { isset } from './typeGuards.utility.js';

export const tryParseJSON = (text) => {
  try {
    const data = JSON.parse(text);
    return { data };
  } catch (error) {
    return { error };
  }
};

export const hasData = (result) => 'data' in result && isset(result.data);

export const hasError = (result) => 'error' in result;
