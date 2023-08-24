import { useContext } from 'react';

import { IoCContainerContext } from './IoCContainer.context';

export const useInject = <T extends unknown>(token: symbol): T | never =>
  useContext(IoCContainerContext).get(token);
