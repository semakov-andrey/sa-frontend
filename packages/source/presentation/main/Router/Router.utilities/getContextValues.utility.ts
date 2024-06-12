import { iswritten } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { pathToRegexp } from '../../../common/utilities/pathToRegExp.utility';
import { toArray } from '../../../common/utilities/toArray.utility';
import { type RouterContextValues } from '../Router.context';

import { isRouteElement } from './isRouteElement.utility';

export interface GetContextValuesParams {
  location: string;
  children: OneOrMore<EntireElement>;
}

export type GetContextValuesResult = Pick<RouterContextValues, 'matching' | 'route'>;

export const getContextValues = (params: GetContextValuesParams): GetContextValuesResult => {
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
