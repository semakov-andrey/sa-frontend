export interface UseHistoryReturn {
  push: (path: string) => void;
}

export const useHistory = (): UseHistoryReturn => ({
  push: (path: string): void => {
    window.dispatchEvent(new CustomEvent('popstate', { detail: path }));
  }
});
