import { isset } from '@sa-frontend/application/utilities/typeGuards.utilities';

const escapeRx = (str: string): string => str.replace(/([.+*?=^!:${}[\]/\\])/gu, '\\$1');

export interface PathToRegexpReturn {
  keys: string[];
  regexp: RegExp;
}

export const pathToRegexp = (path: string): PathToRegexpReturn => {
  if (path === '*') {
    return { keys: [], regexp: /.*/iu };
  }

  const groupRx = /\/:([A-Za-z0-9_]+)(\([A-Za-z0-9|]+\))?(\?)?(\+)?/gu;

  let match: RegExpExecArray | null = groupRx.exec(path);
  let lastIndex = 0;
  const keys: string[] = [];
  let result = '';

  while (match !== null) {
    const [ , segment, choices, optional, rest ] = match;

    const prefix = path[match.index - 1] === '/' ? 1 : 0;
    const prev = path.substring(lastIndex, match.index - prefix);

    if (isset(segment)) keys.push(segment);
    lastIndex = groupRx.lastIndex;

    const newRegExp = isset(choices)
      ? `/${ choices }`
      : isset(optional)
        ? '/?([A-Za-z0-9_]+)?'
        : `/([A-Za-z0-9_]+${ isset(rest) ? '(/.*)?' : '' })`;
    result += `${ escapeRx(prev) }${ newRegExp }`;
    match = groupRx.exec(path);
  }

  result += escapeRx(path.substring(lastIndex));
  return { keys, regexp: new RegExp(`^${ result }$`, 'iu') };
};
