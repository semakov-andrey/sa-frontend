export type TransferResponseOrError<T> = Promise<T | TransferError>;

export interface TransferError {
  code: TransferStatusCodeError;
  message: string;
}

export type TransferStatusCodeSuccess = 200 | 201 | 204;

export type TransferStatusCodeError = 400 | 401 | 403 | 404 | 409 | 500 | 504 | 520;
