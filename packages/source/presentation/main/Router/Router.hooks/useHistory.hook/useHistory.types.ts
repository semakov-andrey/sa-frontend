export interface UseHistoryReturn {
  push: (path: string, isKey?: boolean) => void;
  replace: (path: string, isKey?: boolean) => void;
  back: (isKey?: boolean) => void;
  listen: (params: ListenParams) => ListenReturn;
}

export interface ListenParams {
  makeOnNextRoute?: (event: HistoryEvent) => void;
  makeOnReplacedRoute?: (event: HistoryEvent) => void;
  makeOnPreviousRoute?: (event: HistoryEvent) => void;
}

export type ListenReturn = () => void;

export interface HistoryEvent extends CustomEvent {
  readonly detail: HistoryEventDetail;
}

export interface HistoryEventDetail {
  type: 'push' | 'replace' | 'back';
  path?: string;
  isKey?: boolean;
}

export type HistoryEventType = 'push' | 'replace' | 'back';
