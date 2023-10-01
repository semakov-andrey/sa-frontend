export interface UseHistoryReturn {
  push: (path: string) => void;
}

export const useHistory = (): UseHistoryReturn => ({
  push: (path: string): void => {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('popstate'));
  }
});
