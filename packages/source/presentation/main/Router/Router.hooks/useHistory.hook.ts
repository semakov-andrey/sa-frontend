import { useMemo } from 'react';

export interface UseHistoryReturn {
  push: (path: string) => void;
  replace: (path: string) => void;
  back: () => void;
}

export const useHistory = (): UseHistoryReturn => useMemo(() => ({
  push: (path: string): void => {
    window.dispatchEvent(new CustomEvent('history-push', { detail: path }));
  },
  replace: (path: string): void => {
    window.dispatchEvent(new CustomEvent('history-replace', { detail: path }));
  },
  back: (): void => {
    window.dispatchEvent(new CustomEvent('history-back', { detail: 'back' }));
  }
}), []);
