import { iswritten } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { pathToRegexp } from '../../../../../common/utilities/pathToRegExp.utility';
import { toArray } from '../../../../../common/utilities/toArray.utility';

import { isRouteElement } from './getChildren.utility';

export interface GetMatchParams {
  location: string;
  children: OneOrMore<EntireElement>;
}

export const getMatch = (params: GetMatchParams): ObjectDefType<string, string> => {
  const { location, children } = params;

  let matching: ObjectDefType<string, string> = {};

  for (const element of toArray(children)) {
    if (!isRouteElement(element)) continue;

    const { regexp, keys } = pathToRegexp(element.props.path);
    const out = regexp.exec(location);
    if (!iswritten(out)) continue;

    matching = Object.fromEntries(keys.map((key: string, index: number) => [ key, out[index + 1] ?? '' ]));
    break;
  }

  return matching;
};
