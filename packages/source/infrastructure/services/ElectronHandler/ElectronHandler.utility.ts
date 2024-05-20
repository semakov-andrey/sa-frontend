import { type TransferError, type TransferParameters } from '@sa-frontend/application/contracts/ResponseTransfer/ResponseTransfer.contracts';
import { isKeyOfObject, isTypeObject, isTypeString } from '@sa-frontend/application/utilities/typeGuards.utilities';

export class ElectronHandlerError implements TransferError {
  constructor(public message: string) {}

  public type = 'transferError' as const;
}

export const isTransferParameters = (data: unknown): data is TransferParameters => {
  if (!isTypeObject(data)) return false;
  if (!isKeyOfObject(data, 'controller') || !isTypeString(data.controller)) return false;
  if (!isKeyOfObject(data, 'method') || !isTypeString(data.method)) return false;
  if (!isKeyOfObject(data, 'body') || !Array.isArray(data.body)) return false;
  return true;
};
