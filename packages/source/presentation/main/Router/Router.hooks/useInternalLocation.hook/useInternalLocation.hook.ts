import { useLayoutEffect, useState } from 'react';

import { sessionStorageUnique } from '@sa-frontend/application/contracts/ExternalStorage/ExternalStorage.constant';
import { isFilledString, isTypeString, isset } from '@sa-frontend/application/utilities/typeGuards.utilities';
import { useEvent } from '@sa-frontend/presentation/common/hooks/useEvent.hook';
import { useInject } from '@sa-frontend/presentation/common/hooks/useInject.hook';

import { useHistory } from '../useHistory.hook/useHistory.hook';

import { SS_HISTORY_KEY, SS_KEY } from './useInternalLocation.constant';

import type { HistoryEvent } from '../useHistory.hook/useHistory.types';

export interface UseInternalLocationParams {
  isMemory?: boolean;
}

export const useInternalLocation = (params: UseInternalLocationParams): string => {
  const { isMemory = false } = params;

  const sessionStorage = useInject(sessionStorageUnique);
  const lsLocation = sessionStorage.get(SS_KEY);
  const lsLocationHistory = sessionStorage.get(SS_HISTORY_KEY);

  const history = useHistory();
  const [ location, setLocation ] = useState<string>(isMemory
    ? isFilledString(lsLocation) ? lsLocation : '/'
    : window.location.pathname);
  const [ locationHistory, setLocationHistory ] = useState<string[]>(
    isMemory
    && Array.isArray(lsLocationHistory)
    && lsLocationHistory.every((location: unknown) => isTypeString(location))
      ? lsLocationHistory
      : [ location ]
  );

  const makeOnNextRoute = useEvent((event: HistoryEvent) => {
    const newLocation = event.detail.path ?? '/';
    const newLocationHistory = [ ...locationHistory, newLocation ];
    setLocation(newLocation);
    setLocationHistory(newLocationHistory);
    if (isMemory) {
      sessionStorage.set(SS_KEY, newLocation);
      sessionStorage.set(SS_HISTORY_KEY, newLocationHistory);
      return;
    }

    window.history.pushState(null, '', newLocation);
  });

  const makeOnReplacedRoute = useEvent((event: HistoryEvent) => {
    const newLocation = event.detail.path ?? '/';
    const newLocationHistory = [ ...locationHistory.slice(0, -1), newLocation ];
    setLocation(newLocation);
    setLocationHistory(newLocationHistory);
    if (isMemory) {
      sessionStorage.set(SS_KEY, newLocation);
      sessionStorage.set(SS_HISTORY_KEY, newLocationHistory);
      return;
    }

    window.history.replaceState(null, '', newLocation);
  });

  const makeOnPreviousRoute = useEvent((): void => {
    const newLocationHistory = locationHistory.slice(0, -1);
    const newLocation = newLocationHistory.at(-1);
    if (!isset(newLocation)) return;

    setLocation(newLocation);
    setLocationHistory(newLocationHistory);
    if (isMemory) {
      sessionStorage.set(SS_KEY, newLocation);
      sessionStorage.set(SS_HISTORY_KEY, newLocationHistory);
      return;
    }

    window.history.back();
  });

  useLayoutEffect(() => {
    const unsubscribe = history.listen({
      makeOnNextRoute,
      makeOnReplacedRoute,
      makeOnPreviousRoute
    });

    return unsubscribe;
  }, [ history, makeOnNextRoute, makeOnReplacedRoute, makeOnPreviousRoute ]);

  return location;
};
