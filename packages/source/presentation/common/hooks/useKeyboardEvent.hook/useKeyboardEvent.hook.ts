import { useEffect } from 'react';

import { throttle } from '@sa-frontend/application/utilities/throttle.utility';
import { isset } from '@sa-frontend/application/utilities/typeGuards.utilities';

export const useKeyboardEvent = (
  button: string | undefined,
  handler: () => void,
  deps: Array<unknown>,
  preventDefault: boolean
): void => {
  useEffect(() => {
    if (!isset(button)) return;
    const trottledHandler = throttle(handler, 250);
    const callback = (event: KeyboardEvent): void => {
      if (event.code === button) {
        if (preventDefault) event.preventDefault();
        trottledHandler();
      }
    };
    document.documentElement.addEventListener('keydown', callback);

    return (): void => {
      document.documentElement.removeEventListener('keydown', callback);
    };
  }, deps);
};
