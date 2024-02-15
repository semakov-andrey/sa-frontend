import '@sa-frontend/infrastructure/services';

import React, { useMemo } from 'react';

import { RouterContext } from './Router.context';
import { useInternalLocation } from './Router.hooks/useInternalLocation.hook/useInternalLocation.hook';
import { getChildren } from './Router.utilities/getChildren.utility';
import { getMatching } from './Router.utilities/getMatching.utility';

export interface RouterProps {
  children: OneOrMore<EntireElement>;
  isMemory?: boolean;
}

export const Router = (props: RouterProps): JSX.Element | null => {
  const { children, isMemory } = props;

  const location = useInternalLocation({ isMemory });
  const routerContextValue = useMemo(() => ({
    location,
    ...getMatching({ location, children })
  }), [ location, children ]);
  const jsx = getChildren({ location, children });

  return (
    <RouterContext.Provider value={ routerContextValue }>
      { jsx }
    </RouterContext.Provider>
  );
};
