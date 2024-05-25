import { type EventResponseParameters } from '@sa-frontend/application/contracts/EventResponse/EventResponse.contracts';
import { type TransferError, type TransferStatusCodeError } from '@sa-frontend/application/contracts/Transfer/Transfer.contracts';
import { isKeyOfObject, isTypeObject, isTypeString } from '@sa-frontend/application/utilities/typeGuards.utilities';

export class ElectronHandlerError implements TransferError {
  constructor(public code: TransferStatusCodeError, public message: string = '') {}
}

export const isTransferParameters = (data: unknown): data is EventResponseParameters => {
  if (!isTypeObject(data)) return false;
  if (!isKeyOfObject(data, 'controller') || !isTypeString(data.controller)) return false;
  if (!isKeyOfObject(data, 'method') || !isTypeString(data.method)) return false;
  if (!isKeyOfObject(data, 'body') || !Array.isArray(data.body)) return false;
  return true;
};
