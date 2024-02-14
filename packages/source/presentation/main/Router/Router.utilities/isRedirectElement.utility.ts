import { isValidElement } from 'react';

import { Redirect, type RedirectProps } from '../../Redirect/Redirect';

export const isRedirectElement = (element: ExistElement): element is React.ReactElement<RedirectProps> =>
  isValidElement(element) && element.type === Redirect;
