import { useEvent } from '@sa-frontend/presentation/common/hooks/useEvent.hook';

import { HISTORY_EVENT, HISTORY_TYPES } from './useHistory.constants';
import { isHistoryEvent } from './useHistory.utility';

import type { HistoryEventDetail, ListenParams, UseHistoryReturn } from './useHistory.types';

export const useHistory = (): UseHistoryReturn => {
  const createEvent = useEvent((detail: HistoryEventDetail) =>
    new CustomEvent(HISTORY_EVENT, { detail }));

  const push = useEvent((path: string, isKey?: boolean) => {
    window.dispatchEvent(createEvent({ type: 'push', path, isKey }));
  });

  const replace = useEvent((path: string, isKey?: boolean) => {
    window.dispatchEvent(createEvent({ type: 'replace', path, isKey }));
  });

  const back = useEvent((isKey?: boolean) => {
    window.dispatchEvent(createEvent({ type: 'back', isKey }));
  });

  const listen = useEvent((params: ListenParams) => {
    const { makeOnNextRoute, makeOnReplacedRoute, makeOnPreviousRoute } = params;

    const listenHandler = (event: Event): void => {
      if (!isHistoryEvent(event)) return;

      switch (event.detail.type) {
        case HISTORY_TYPES.PUSH:
          makeOnNextRoute?.(event);
          break;
        case HISTORY_TYPES.REPLACE:
          makeOnReplacedRoute?.(event);
          break;
        case HISTORY_TYPES.BACK:
          makeOnPreviousRoute?.(event);
          break;
        default:
      }
    };

    window.addEventListener(HISTORY_EVENT, listenHandler);

    return () => {
      window.removeEventListener(HISTORY_EVENT, listenHandler);
    };
  });

  return { push, replace, back, listen };
};
