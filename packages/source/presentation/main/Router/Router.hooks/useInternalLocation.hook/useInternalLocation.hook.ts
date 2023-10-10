import { useCallback, useEffect, useState } from 'react';

import { isCustomEvent } from './useInternalLocation.utility';

export interface UseInternalLocationParams {
  isMemory?: boolean;
}

export const useInternalLocation = (params: UseInternalLocationParams): string => {
  const { isMemory = false } = params;
  const [ location, setLocation ] = useState<string>(isMemory ? '/' : window.location.pathname);

  const determineRoute = useCallback((event: Event) => {
    if (!isCustomEvent(event)) return;

    const location = event.detail;
    setLocation(location);
    if (isMemory) return;

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
