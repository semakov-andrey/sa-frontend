import { useEvent } from '../useEvent.hook';
import { useKeyboardEvent } from '../useKeyboardEvent.hook/useKeyboardEvent.hook';

import { setKeyboardContext } from './useKeyboardContext.store';

export interface UseKeyboardContextParams {
  keys: string[];
}

export const useKeyboardContext = (params: UseKeyboardContextParams): void => {
  const resetKeyboardContext = useEvent(() => {
    setKeyboardContext(false);
    document.documentElement.removeEventListener('mousemove', resetKeyboardContext);
  });

  useKeyboardEvent(params.keys, () => {
    setKeyboardContext(true);
    document.documentElement.addEventListener('mousemove', resetKeyboardContext);
  });
};
