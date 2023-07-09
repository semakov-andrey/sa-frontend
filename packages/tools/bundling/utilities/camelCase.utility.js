import { capitalize } from './capitalize.utility.js';
import { isTypeString } from './typeGuards.utility.js';

const processSymbol = (str, symbol) =>
  str
    .split(symbol)
    .filter((word) => word !== '')
    .map((word, index) => index === 0 ? word : capitalize(word))
    .join('');

export const camelCase = (str) => {
  if (!isTypeString(str)) throw new Error('This isn\'t a string');

  let result = processSymbol(str, ' ');
  result = processSymbol(result, '_');
  result = processSymbol(result, '-');
  result = processSymbol(result, '.');
  return result;
};
