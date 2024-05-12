import { isset } from '@sa-frontend/application/utilities/typeGuards.utilities';
import { useEvent } from '@sa-frontend/presentation/common/hooks/useEvent.hook';

import { HISTORY_BACK, HISTORY_PUSH, HISTORY_REPLACE } from './useHistory.constants';

import type { ListenParams, UseHistoryReturn } from './useHistory.types';

export const useHistory = (): UseHistoryReturn => {
  const push = useEvent((path: string) => {
    window.dispatchEvent(new CustomEvent(HISTORY_PUSH, { detail: path }));
  });

  const replace = useEvent((path: string) => {
    window.dispatchEvent(new CustomEvent(HISTORY_REPLACE, { detail: path }));
  });

  const back = useEvent(() => {
    window.dispatchEvent(new CustomEvent(HISTORY_BACK, { detail: 'back' }));
  });

  const listen = useEvent((params: ListenParams) => {
    const { makeOnNextRoute, makeOnReplacedRoute, makeOnPreviousRoute } = params;
    if (isset(makeOnNextRoute)) window.addEventListener(HISTORY_PUSH, makeOnNextRoute);
    if (isset(makeOnReplacedRoute)) window.addEventListener(HISTORY_REPLACE, makeOnReplacedRoute);
    if (isset(makeOnPreviousRoute)) window.addEventListener(HISTORY_BACK, makeOnPreviousRoute);

    return () => {
      if (isset(makeOnNextRoute)) window.removeEventListener(HISTORY_PUSH, makeOnNextRoute);
      if (isset(makeOnReplacedRoute)) window.removeEventListener(HISTORY_REPLACE, makeOnReplacedRoute);
      if (isset(makeOnPreviousRoute)) window.removeEventListener(HISTORY_BACK, makeOnPreviousRoute);
    };
  });

  return { push, replace, back, listen };
};
