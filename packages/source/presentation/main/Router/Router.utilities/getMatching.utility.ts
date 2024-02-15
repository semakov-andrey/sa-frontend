import { iswritten } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { pathToRegexp } from '../../../common/utilities/pathToRegExp.utility';
import { toArray } from '../../../common/utilities/toArray.utility';

import { isRouteElement } from './isRouteElement.utility';

export interface GetMatchingParams {
  location: string;
  children: OneOrMore<EntireElement>;
}

export interface GetMatchingReturnType {
  matching: ObjectDefType<string, string>;
  route: string;
}

export const getMatching = (params: GetMatchingParams): GetMatchingReturnType => {
  const { location, children } = params;

  let matching: ObjectDefType<string, string> = {};
  let route = '';

  for (const element of toArray(children)) {
    if (!isRouteElement(element)) continue;

    const { regexp, keys } = pathToRegexp(element.props.path);
    const out = regexp.exec(location);
    if (!iswritten(out)) continue;

    matching = Object.fromEntries(keys.map((key: string, index: number) => [ key, out[index + 1] ?? '' ]));
    route = element.props.path;
    break;
  }

  return { matching, route };
};
