import { type TransferError, type TransferResponseOrError, type TransferStatusCodeError } from '../Transfer/Transfer.contracts';

export interface TransferConstructor {
  new (options?: HttpRequestOptions): HttpRequest;
};

export interface HttpRequest {
  go: <T>(settings: HttpRequestSettings) => TransferResponseOrError<T>;
  getData: (settings: HttpRequestSettings) => RequestInit;
  getQuery: (body?: HttpRequestBody) => string;
  transferError: (code: TransferStatusCodeError, message?: string) => TransferError;
  isTransferError: <T>(u: T | TransferError) => u is TransferError;
}

export interface HttpRequestOptions {
  parseDates?: (_: string, value: unknown) => unknown | Date;
}

export interface HttpRequestSettings {
  method?: HTTPRequestMethods;
  url: string;
  body?: HttpRequestBody;
  headers?: object;
  options?: {
    readAsArrayBuffer?: boolean
  };
}

export type HTTPRequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpRequestBody = OneOrMore<object> | FormData;

