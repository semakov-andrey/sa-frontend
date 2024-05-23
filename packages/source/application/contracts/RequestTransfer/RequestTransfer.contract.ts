import { type TransferError, type TransferResponseOrError } from '@sa-frontend/application/contracts/Transfer/Transfer.contracts';

export interface RequestTransfer {
  request: <Data>(controller: string, method: string, body: unknown[]) => TransferResponseOrError<Data>;
  isTransferError: <Data>(u: Data | TransferError) => u is TransferError;
};
