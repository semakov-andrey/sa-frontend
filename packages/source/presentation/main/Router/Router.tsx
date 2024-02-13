import '@sa-frontend/infrastructure/services';

import React, { useMemo } from 'react';

import { RouterContext } from './Router.context';
import { useInternalLocation } from './Router.hooks/useInternalLocation.hook/useInternalLocation.hook';
import { getChildren } from './Router.hooks/useInternalLocation.hook/useInternalLocation.utilities/getChildren.utility';
import { getMatch } from './Router.hooks/useInternalLocation.hook/useInternalLocation.utilities/getMatch.utility';

export interface RouterProps {
  children: OneOrMore<EntireElement>;
  isMemory?: boolean;
}

export const Router = (props: RouterProps): JSX.Element | null => {
  const { children, isMemory } = props;

  const location = useInternalLocation({ isMemory });
  const jsx = getChildren({ children, location });
  const routerContextValue = useMemo(() => ({
    location,
    matching: getMatch({ location, children })
  }), [ location, children ]);

  return (
    <RouterContext.Provider value={ routerContextValue }>
      { jsx }
    </RouterContext.Provider>
  );
};
