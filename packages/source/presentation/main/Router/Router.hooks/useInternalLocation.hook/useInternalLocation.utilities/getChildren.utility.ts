import { iswritten } from '@sa-frontend/application/utilities/typeGuards.utilities';
import { pathToRegexp } from '@sa-frontend/presentation/common/utilities/pathToRegExp.utility';
import { toArray } from '@sa-frontend/presentation/common/utilities/toArray.utility';

import { isRedirectElement } from './isRedirectElement.utility';
import { isRouteElement } from './isRouteElement.utility';

export interface GetChildrenParams {
  children: OneOrMore<EntireElement>;
  location: string;
}

export const getChildren = (params: GetChildrenParams): ExistElement[] => {
  const { children, location } = params;

  let matched = false;
  const childrenArray: ExistElement[] = toArray(children)
    .map((element: ExistElement) =>
      isRouteElement(element) ? { ...element, key: element.props.path } : element)
    .filter((element: ExistElement) => {
      if (isRouteElement(element)) {
        if (matched) return false;
        const { regexp } = pathToRegexp(element.props.path);
        const out = regexp.exec(location);
        if (!iswritten(out)) return false;
        matched = true;
        return true;
      }
      if (isRedirectElement(element)) return !matched;
      return true;
    });

  return childrenArray;
};
