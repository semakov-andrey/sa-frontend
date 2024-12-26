import { type TransferError, type TransferResponseOrError, type TransferStatusCodeError } from '../Transfer/Transfer.contracts';

export interface TransferConstructor {
  new (): HttpRequest;
};

export interface HttpRequest {
  go: <T>(settings: HttpRequestSettings) => TransferResponseOrError<T>;
  getData: (settings: HttpRequestSettings) => RequestInit;
  getQuery: (body?: HttpRequestBody) => string;
  transferError: (code: TransferStatusCodeError, message?: string) => TransferError;
  isTransferError: <T>(u: T | TransferError) => u is TransferError;
}

export interface HttpRequestSettings {
  method?: HTTPRequestMethods;
  url: string;
  body?: HttpRequestBody;
  headers?: object;
  options?: {
    readAsArrayBuffer?: boolean,
    reviver?: (_: string, value: unknown) => unknown
  };
}

export type HTTPRequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpRequestBody = OneOrMore<object> | FormData;

