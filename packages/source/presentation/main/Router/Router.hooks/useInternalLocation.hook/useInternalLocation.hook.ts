import { useCallback, useEffect, useState } from 'react';

import { externalStorageUnique } from '@sa-frontend/application/contracts/ExternalStorage/ExternalStorage.constant';
import { isFilledString } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { useInject } from '../../../../common/hooks/useInject.hook';

import { LS_KEY } from './useInternalLocation.constant';
import { isCustomEvent } from './useInternalLocation.utility';

export interface UseInternalLocationParams {
  isMemory?: boolean;
}

export const useInternalLocation = (params: UseInternalLocationParams): string => {
  const { isMemory = false } = params;

  const localStorage = useInject(externalStorageUnique);
  const lsLocation = localStorage.get(LS_KEY);

  const [ location, setLocation ] = useState<string>(isMemory
    ? isFilledString(lsLocation) ? lsLocation : '/'
    : window.location.pathname);

  const determineRoute = useCallback((event: Event) => {
    if (!isCustomEvent(event)) return;

    const location = event.detail;
    setLocation(location);
    if (isMemory) {
      localStorage.set(LS_KEY, location);
      return;
    }

    window.history.pushState(null, '', location);
  }, [ isMemory ]);

  useEffect(() => {
    window.addEventListener('popstate', determineRoute);

    return (): void => {
      window.removeEventListener('popstate', determineRoute);
    };
  }, [ determineRoute ]);

  return location;
};
