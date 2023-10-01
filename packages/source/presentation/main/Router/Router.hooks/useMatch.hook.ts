import { useContext } from 'react';

import { RouterContext } from '../Router.context';

export const useMatch = (): ObjectDefType<string, string> =>
  useContext(RouterContext).matching;
