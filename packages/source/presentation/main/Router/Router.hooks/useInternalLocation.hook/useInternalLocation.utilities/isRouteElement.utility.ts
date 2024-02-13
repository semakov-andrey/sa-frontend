import { isValidElement } from 'react';

import { Route, type RouteProps } from '../../../../Route/Route';

export const isRouteElement = (element: ExistElement): element is React.ReactElement<RouteProps> =>
  isValidElement(element) && element.type === Route;
