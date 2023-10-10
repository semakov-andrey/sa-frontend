import { isValidElement } from 'react';

import { Redirect, type RedirectProps } from '../../../Redirect/Redirect';
import { Route, type RouteProps } from '../../../Route/Route';

export const isRouteElement = (element: ExistElement): element is React.ReactElement<RouteProps> =>
  isValidElement(element) && element.type === Route;

export const isRedirectElement = (element: ExistElement): element is React.ReactElement<RedirectProps> =>
  isValidElement(element) && element.type === Redirect;
