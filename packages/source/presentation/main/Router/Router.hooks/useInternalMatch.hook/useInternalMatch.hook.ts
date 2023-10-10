import { useEffect, useState } from 'react';

import { iswritten } from '@sa-frontend/application/utilities/typeGuards.utilities';
import { pathToRegexp } from '@sa-frontend/presentation/common/utilities/pathToRegExp.utility';
import { toArray } from '@sa-frontend/presentation/common/utilities/toArray.utility';

import { isRouteElement } from '../useInternalChildren.hook/useInternalChildren.utilities';

export interface UseInternalMatchParams {
  location: string;
  children: OneOrMore<EntireElement>;
}

export const useInternalMatch = (params: UseInternalMatchParams): ObjectDefType<string, string> => {
  const { location, children } = params;
  const [ matching, setMatching ] = useState<ObjectDefType<string, string>>({});

  useEffect(() => {
    for (const element of toArray(children)) {
      if (!isRouteElement(element)) continue;

      const { regexp, keys } = pathToRegexp(element.props.path);
      const out = regexp.exec(location);
      if (!iswritten(out)) continue;

      setMatching(Object.fromEntries(keys.map((key: string, index: number) => [ key, out[index + 1] ?? '' ])));
      return;
    }
  }, [ location, children ]);

  return matching;
};
