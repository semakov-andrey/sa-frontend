import {
  type TransferError,
  type TransferResponseOrError,
  type TransferStatusCodeError
} from '@sa-frontend/application/contracts/Transfer/Transfer.contracts';

export interface EventRequest {
  request: <Data>(controller: string, method: string, body: unknown[]) => TransferResponseOrError<Data>;
  transferError: (code: TransferStatusCodeError, message?: string) => TransferError;
  isTransferError: <Data>(u: Data | TransferError) => u is TransferError;
};
