import { useContext } from 'react';

import { RouterContext } from '../Router.context';

export const useMatching = (): ObjectDefType<string, string> =>
  useContext(RouterContext).matching;
