import { useContext } from 'react';

import { RouterContext } from '../Router.context';

export const useRoute = (): string =>
  useContext(RouterContext).route;
