import { isTypeString, isset } from '@sa-frontend/application/utilities/typeGuards.utilities';

export const isCustomEvent = (event?: Event): event is CustomEvent<string> =>
  isset(event) && 'detail' in event && isTypeString(event.detail);
