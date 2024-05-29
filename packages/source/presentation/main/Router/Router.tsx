import '@sa-frontend/infrastructure/services';

import React, { useMemo } from 'react';

import { RouterContext } from './Router.context';
import { useStore } from './Router.hooks/useStore.hook/useStore.hook';
import { getContextValues } from './Router.utilities/getContextValues.utility';

export interface RouterProps {
  children: OneOrMore<EntireElement>;
  isMemory?: boolean;
}

export const Router = (props: RouterProps): JSX.Element | null => {
  const { children, isMemory } = props;

  const { location, locations } = useStore({ isMemory });
  const value = useMemo(() => ({
    location,
    locations,
    ...getContextValues({ location, children })
  }), [ location, locations, children ]);

  return (
    <RouterContext.Provider value={ value }>
      { children }
    </RouterContext.Provider>
  );
};
