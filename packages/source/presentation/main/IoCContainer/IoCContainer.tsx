import React from 'react';

import { iocContainer } from '@sa-frontend/application/components/iocContainer/iocContainer';

import { IoCContainerContext } from './IoCContainer.context';

export interface IoCContainerProviderProps {
  children: EntireElement;
};

export const IoCContainerProvider = (
  props: IoCContainerProviderProps
): JSX.Element => (
  <IoCContainerContext.Provider value={ iocContainer }>
    { props.children }
  </IoCContainerContext.Provider>
);
