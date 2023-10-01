import { isset } from '@sa-frontend/application/utilities/typeGuards.utilities';

const escapeRx = (str: string): string => str.replace(/([.+*?=^!:${}[\]/\\])/gu, '\\$1');

const rxForSegment = (repeat: boolean, optional: boolean, prefix: 0 | 1): string => {
  let capture = repeat ? '((?:[^\\/]+?)(?:\\/(?:[^\\/]+?))*)' : '';
  if (optional && prefix) capture = `(?:\\/${ capture })`;
  return capture + (optional ? '?' : '');
};

export interface PathToRegexpReturn {
  keys: Array<string>;
  regexp: RegExp;
}

export const pathToRegexp = (path: string): PathToRegexpReturn => {
  const groupRx = /:([A-Za-z0-9_]+)([?+*]?)/gu;

  let match: RegExpExecArray | null = groupRx.exec(path);
  let lastIndex = 0;
  const keys: Array<string> = [];
  let result = '';

  while (match !== null) {
    const [ , segment, mod ] = match;

    const repeat = mod === '+' || mod === '*';
    const optional = mod === '?' || mod === '*';
    const prefix = optional && path[match.index - 1] === '/' ? 1 : 0;

    const prev = path.substring(lastIndex, match.index - prefix);

    if (isset(segment)) keys.push(segment);
    lastIndex = groupRx.lastIndex;

    result += `${ escapeRx(prev) }${ rxForSegment(repeat, optional, prefix) }`;
    match = groupRx.exec(path);
  }

  result += escapeRx(path.substring(lastIndex));
  return { keys, regexp: new RegExp(`^${ result }(?:\\/)?$`, 'iu') };
};
