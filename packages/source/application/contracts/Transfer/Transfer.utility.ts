import { TRANSFER_ERROR_STATUSES } from './Transfer.constants';
import { type TransferStatusCodeError } from './Transfer.contracts';

export const isTransferStatusCodeError = (code: unknown): code is TransferStatusCodeError =>
  TRANSFER_ERROR_STATUSES.includes(code);
