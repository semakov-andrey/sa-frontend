export interface UseHistoryReturn {
  push: (path: string) => void;
  replace: (path: string) => void;
  back: () => void;
  listen: (params: ListenParams) => ListenReturn;
}

export interface ListenParams {
  makeOnNextRoute?: (event: Event) => void;
  makeOnReplacedRoute?: (event: Event) => void;
  makeOnPreviousRoute?: (event: Event) => void;
}

export type ListenReturn = () => void;
