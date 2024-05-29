export interface UseHistoryResult {
  push: (path: string, isKey?: boolean) => void;
  replace: (path: string, isKey?: boolean) => void;
  back: (isKey?: boolean) => void;
  listen: (params: ListenParams) => ListenResult;
}

export interface ListenParams {
  onNextRoute?: (event: HistoryEvent) => void;
  onReplacedRoute?: (event: HistoryEvent) => void;
  onPreviousRoute?: (event: HistoryEvent) => void;
}

export type ListenResult = () => void;

export interface HistoryEvent extends CustomEvent {
  readonly detail: HistoryEventDetail;
}

export interface HistoryEventDetail {
  type: HistoryEventType;
  location: string;
  isKey?: boolean;
}

export type HistoryEventType = 'push' | 'replace' | 'back';
