import React, { isValidElement, useCallback, useEffect, useMemo, useState } from 'react';

import { isKeyOfObject, isTypeObject, isTypeString, iswritten } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { pathToRegexp } from '../../common/utilities/pathToRegExp.utility';
import { toArray } from '../../common/utilities/toArray.utility';

import { RouterContext } from './Router.context';

export interface RouterProps {
  children: OneOrMore<EntireElement>;
}

export const Router = (props: RouterProps): JSX.Element | null => {
  const { children } = props;
  const [ route, setRoute ] = useState<ExistElement | null>(null);
  const [ location, setLocation ] = useState<string>(window.location.pathname);
  const [ matching, setMatching ] = useState<ObjectDefType<string, string>>({});

  const determineRoute = useCallback(() => {
    setLocation(window.location.pathname);

    for (const element of toArray(children)) {
      if (isValidElement(element)
        && isTypeObject(element.props)
        && isKeyOfObject(element.props, 'path')
        && isTypeString(element.props.path)) {
        const { regexp, keys } = pathToRegexp(element.props.path);
        const out = regexp.exec(window.location.pathname);

        if (iswritten(out)) {
          setMatching(Object.fromEntries(keys.map((key: string, index: number) => [ key, out[index + 1] ?? '' ])));
          setRoute(element);
          return;
        }
      } else {
        setRoute(element);
        return;
      }
    }

    setRoute(null);
  }, [ children ]);

  useEffect(() => {
    determineRoute();
    window.addEventListener('popstate', determineRoute);

    return () => {
      window.removeEventListener('popstate', determineRoute);
    };
  }, [ determineRoute ]);

  const routerContextValue = useMemo(() => ({ location, matching }), [ location, matching ]);

  return (
    <RouterContext.Provider value={ routerContextValue }>
      { route }
    </RouterContext.Provider>
  );
};
