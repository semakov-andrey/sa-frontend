import { useLayoutEffect, useState } from 'react';

import { sessionStorageUnique } from '@sa-frontend/application/contracts/ExternalStorage/ExternalStorage.constant';
import { isFilledString, isTypeString, isset } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { useEvent } from '../../../../common/hooks/useEvent.hook';
import { useInject } from '../../../../common/hooks/useInject.hook';

import { SS_HISTORY_KEY, SS_KEY } from './useInternalLocation.constant';
import { isCustomEvent } from './useInternalLocation.utility';

export interface UseInternalLocationParams {
  isMemory?: boolean;
}

export const useInternalLocation = (params: UseInternalLocationParams): string => {
  const { isMemory = false } = params;

  const sessionStorage = useInject(sessionStorageUnique);
  const lsLocation = sessionStorage.get(SS_KEY);
  const lsLocationHistory = sessionStorage.get(SS_HISTORY_KEY);

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

  const determineRoute = useEvent((event: Event) => {
    if (!isCustomEvent(event)) return;

    const newLocation = event.detail;
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

  const replaceRoute = useEvent((event: Event) => {
    if (!isCustomEvent(event)) return;

    const newLocation = event.detail;
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

  const goToPreviousRoute = useEvent((event: Event): void => {
    if (!isCustomEvent(event)) return;

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
    window.addEventListener('history-push', determineRoute);
    window.addEventListener('history-replace', replaceRoute);
    window.addEventListener('history-back', goToPreviousRoute);

    return (): void => {
      window.removeEventListener('history-push', determineRoute);
      window.removeEventListener('history-replace', replaceRoute);
      window.removeEventListener('history-back', goToPreviousRoute);
    };
  }, [ determineRoute, replaceRoute, goToPreviousRoute ]);

  return location;
};
