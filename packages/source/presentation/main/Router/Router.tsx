import React, { useMemo } from 'react';

import { RouterContext } from './Router.context';
import { useInternalChildren } from './Router.hooks/useInternalChildren.hook/useInternalChildren.hook';
import { useInternalLocation } from './Router.hooks/useInternalLocation.hook/useInternalLocation.hook';
import { useInternalMatch } from './Router.hooks/useInternalMatch.hook/useInternalMatch.hook';

export interface RouterProps {
  children: OneOrMore<EntireElement>;
  isMemory?: boolean;
}

export const Router = (props: RouterProps): JSX.Element | null => {
  const { children, isMemory } = props;

  const location = useInternalLocation({ isMemory });
  const matching = useInternalMatch({ location, children });
  const jsx = useInternalChildren({ children, location });
  const routerContextValue = useMemo(() => ({ location, matching }), [ location, matching ]);

  return (
    <RouterContext.Provider value={ routerContextValue }>
      { jsx }
    </RouterContext.Provider>
  );
};
