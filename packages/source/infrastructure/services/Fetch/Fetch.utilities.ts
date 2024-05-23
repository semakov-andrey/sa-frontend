import {
  type TransferError,
  type TransferStatusCodeError
} from '@sa-frontend/application/contracts/Transfer/Transfer.contracts';

export class FetchError implements TransferError {
  constructor(
    public code: TransferStatusCodeError,
    public message: string = ''
  ) {}
}

