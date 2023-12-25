import { useEffect, useState } from 'react';

import { iswritten } from '@sa-frontend/application/utilities/typeGuards.utilities';
import { pathToRegexp } from '@sa-frontend/presentation/common/utilities/pathToRegExp.utility';
import { toArray } from '@sa-frontend/presentation/common/utilities/toArray.utility';

import { isRedirectElement, isRouteElement } from './useInternalChildren.utilities';

export interface UseInternalChildrenParams {
  children: OneOrMore<EntireElement>;
  location: string;
}

export const useInternalChildren = (params: UseInternalChildrenParams): ExistElement[] => {
  const { children, location } = params;
  const [ childrenArray, setChildrenArray ] = useState<ExistElement[]>([]);

  useEffect(() => {
    let matched = false;

    const childrenArray = toArray(children)
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

    setChildrenArray(childrenArray);
  }, [ children, location ]);

  return childrenArray;
};
