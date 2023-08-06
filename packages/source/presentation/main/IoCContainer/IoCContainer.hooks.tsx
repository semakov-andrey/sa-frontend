import { useContext } from 'react';

import { IoCContainerContext } from './IoCContainer.contexts';

export const useInject = <T extends unknown>(token: symbol): T | undefined =>
  useContext(IoCContainerContext).get(token);
