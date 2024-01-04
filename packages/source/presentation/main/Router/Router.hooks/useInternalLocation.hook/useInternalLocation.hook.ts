import { useEffect, useState } from 'react';

import { sessionStorageUnique } from '@sa-frontend/application/contracts/ExternalStorage/ExternalStorage.constant';
import { isFilledString, isset } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { useEvent } from '../../../../common/hooks/useEvent.hook';
import { useInject } from '../../../../common/hooks/useInject.hook';

import { SS_KEY } from './useInternalLocation.constant';
import { isCustomEvent } from './useInternalLocation.utility';

export interface UseInternalLocationParams {
  isMemory?: boolean;
}

export const useInternalLocation = (params: UseInternalLocationParams): string => {
  const { isMemory = false } = params;

  const sessionStorage = useInject(sessionStorageUnique);
  const lsLocation = sessionStorage.get(SS_KEY);

  const [ location, setLocation ] = useState<string>(isMemory
    ? isFilledString(lsLocation) ? lsLocation : '/'
    : window.location.pathname);
  const [ locationHistory, setLocationHistory ] = useState<string[]>([ location ]);

  const determineRoute = useEvent((event: Event) => {
    if (!isCustomEvent(event)) return;

    const location = event.detail;
    setLocation(location);
    setLocationHistory((locationHistory: string[]) =>
      [ ...locationHistory, location ]);
    if (isMemory) {
      sessionStorage.set(SS_KEY, location);
      return;
    }

    window.history.pushState(null, '', location);
  });

  const goToPreviousRoute = useEvent((event: Event): void => {
    if (!isCustomEvent(event)) return;

    const newLocationHistory = locationHistory.slice(0, -1);
    setLocationHistory(newLocationHistory);
    const location = newLocationHistory.at(-1);
    if (!isset(location)) return;

    setLocation(location);
    if (isMemory) {
      sessionStorage.set(SS_KEY, location);
      return;
    }

    window.history.back();
  });

  useEffect(() => {
    window.addEventListener('history-push', determineRoute);
    window.addEventListener('history-back', goToPreviousRoute);

    return (): void => {
      window.removeEventListener('history-push', determineRoute);
      window.removeEventListener('history-back', goToPreviousRoute);
    };
  }, []);

  return location;
};
