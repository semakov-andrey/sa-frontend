export interface UseHistoryReturn {
  push: (path: string) => void;
  back: () => void;
}

export const useHistory = (): UseHistoryReturn => ({
  push: (path: string): void => {
    window.dispatchEvent(new CustomEvent('history-push', { detail: path }));
  },
  back: (): void => {
    window.dispatchEvent(new CustomEvent('history-back'));
  }
});
