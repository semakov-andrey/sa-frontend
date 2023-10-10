import { useContext } from 'react';

import { RouterContext } from '../Router.context';

export const useLocation = (): string =>
  useContext(RouterContext).location;
