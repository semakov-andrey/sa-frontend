import { INITIAL_LOCATION } from '../useStore.hook/useStore.constant';

import { HISTORY_EVENT, HISTORY_TYPES } from './useHistory.constants';
import {
  type HistoryEvent,
  type HistoryEventDetail,
  type ListenParams,
  type ListenResult,
  type UseHistoryResult
} from './useHistory.types';
import { isHistoryEvent } from './useHistory.utility';

const createEvent = (detail: HistoryEventDetail): HistoryEvent =>
  new CustomEvent(HISTORY_EVENT, { detail });

const push = (location: string, isKey?: boolean): void => {
  window.dispatchEvent(createEvent({ type: HISTORY_TYPES.PUSH, location, isKey }));
};

const replace = (location: string, isKey?: boolean): void => {
  window.dispatchEvent(createEvent({ type: HISTORY_TYPES.REPLACE, location, isKey }));
};

const back = (isKey?: boolean): void => {
  window.dispatchEvent(createEvent({ type: HISTORY_TYPES.BACK, location: INITIAL_LOCATION, isKey }));
};

const listen = (params: ListenParams): ListenResult => {
  const { onNextRoute, onReplacedRoute, onPreviousRoute } = params;

  const listenHandler = (event: Event): void => {
    if (!isHistoryEvent(event)) return;

    switch (event.detail.type) {
      case HISTORY_TYPES.PUSH:
        onNextRoute?.(event);
        break;
      case HISTORY_TYPES.REPLACE:
        onReplacedRoute?.(event);
        break;
      case HISTORY_TYPES.BACK:
        onPreviousRoute?.(event);
        break;
      default:
    }
  };

  window.addEventListener(HISTORY_EVENT, listenHandler);

  return (): void => {
    window.removeEventListener(HISTORY_EVENT, listenHandler);
  };
};

export const useHistory = (): UseHistoryResult =>
  ({ push, replace, back, listen });
