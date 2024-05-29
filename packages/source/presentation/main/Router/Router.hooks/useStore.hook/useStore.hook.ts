import { useLayoutEffect, useState } from 'react';

import { sessionStorageUnique } from '@sa-frontend/application/contracts/ExternalStorage/ExternalStorage.constant';
import { isFilledString, isTypeString, isexists } from '@sa-frontend/application/utilities/typeGuards.utilities';
import { useEvent } from '@sa-frontend/presentation/common/hooks/useEvent.hook';
import { useInject } from '@sa-frontend/presentation/common/hooks/useInject.hook';

import { useHistory } from '../useHistory.hook/useHistory.hook';
import { type HistoryEvent } from '../useHistory.hook/useHistory.types';

import { INITIAL_LOCATION, SS_HISTORY_KEY, SS_KEY } from './useStore.constant';

export interface UseStoreParams {
  isMemory?: boolean;
}

export interface UseStoreResult {
  location: string;
  locations: string[];
}

export const useStore = (params: UseStoreParams): UseStoreResult => {
  const { isMemory = false } = params;

  const sessionStorage = useInject(sessionStorageUnique);
  const sessionStorageLocation = sessionStorage.get(SS_KEY);
  const sessionStorageLocations = sessionStorage.get(SS_HISTORY_KEY);

  const history = useHistory();
  const [ location, setLocation ] = useState<string>(isMemory
    ? isFilledString(sessionStorageLocation) ? sessionStorageLocation : INITIAL_LOCATION
    : window.location.pathname);
  const [ locations, setLocations ] = useState<string[]>(
    isMemory
    && Array.isArray(sessionStorageLocations)
    && sessionStorageLocations.every((location: unknown) => isTypeString(location))
      ? sessionStorageLocations
      : [ location ]
  );

  const updateStates = useEvent((
    location: string | undefined,
    locations: string[],
    nativeCallback: () => void
  ) => {
    if (!isexists(location)) return;
    setLocation(location);
    setLocations(locations);
    if (isMemory) {
      sessionStorage.set(SS_KEY, location);
      sessionStorage.set(SS_HISTORY_KEY, locations);
    } else {
      nativeCallback();
    }
  });

  const onNextRoute = useEvent(({ detail: { location } }: HistoryEvent) => {
    updateStates(
      location,
      [ ...locations, location ],
      () => {
        window.history.pushState(null, '', location);
      }
    );
  });

  const onReplacedRoute = useEvent(({ detail: { location } }: HistoryEvent) => {
    updateStates(
      location,
      [ ...locations.slice(0, -1), location ],
      () => {
        window.history.replaceState(null, '', location);
      }
    );
  });

  const onPreviousRoute = useEvent((): void => {
    updateStates(
      locations.slice(0, -1).at(-1),
      locations.slice(0, -1),
      () => {
        window.history.back();
      }
    );
  });

  useLayoutEffect(() => {
    const unsubscribe = history.listen({
      onNextRoute,
      onReplacedRoute,
      onPreviousRoute
    });

    return unsubscribe;
  }, [ history, onNextRoute, onReplacedRoute, onPreviousRoute ]);

  return { location, locations };
};
