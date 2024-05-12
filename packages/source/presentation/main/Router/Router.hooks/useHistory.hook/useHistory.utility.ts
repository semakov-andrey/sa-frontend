import { isTypeObject, isTypeString, isset } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { HISTORY_TYPES } from './useHistory.constants';

import type { HistoryEvent } from './useHistory.types';

export const isHistoryEvent = (event?: Event): event is HistoryEvent =>
  isset(event)
  && 'detail' in event
  && isTypeObject(event.detail)
  && 'type' in event.detail
  && isTypeString(event.detail.type)
  && Object.values(HISTORY_TYPES).includes(event.detail.type);
