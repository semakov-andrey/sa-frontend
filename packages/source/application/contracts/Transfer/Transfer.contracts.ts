export interface TransferConstructor {
  new (options?: TransferOptions): Transfer;
};

export interface Transfer {
  go: <T>(settings: TransferSettings) => TransferResponseOrError<T>;
  getData: (method: TransferMethods, body?: TransferBody, headers?: object) => RequestInit;
  getQuery: (body?: TransferBody) => string;
  isTransferError: <T>(u: T | TransferError) => u is TransferError;
}

export interface TransferOptions {
  parseDates?: (_: string, value: unknown) => unknown | Date;
}

export interface TransferSettings {
  method: TransferMethods;
  url: string;
  body?: TransferBody;
  headers?: object;
}

export type TransferBody = OneOrMore<object> | FormData;

export type TransferResponseOrError<T> = Promise<T | TransferError>;

export type TransferMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type TransferSuccessStatus = 200 | 201 | 204;

export type TransferErrorStatus = 400 | 401 | 403 | 404 | 409 | 500 | 520;

export interface TransferError {
  statusCode: TransferErrorStatus;
  message: string;
}

export interface TransferErrorDetails {
  statusCode: TransferErrorStatus;
  message?: string;
}
