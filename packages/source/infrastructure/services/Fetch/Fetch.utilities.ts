import { TRANSFER_STATUSES } from '@sa-frontend/application/contracts/Transfer/Transfer.constants';
import {
  type TransferError,
  type TransferErrorDetails,
  type TransferErrorStatus
} from '@sa-frontend/application/contracts/Transfer/Transfer.contracts';
import { isset } from '@sa-frontend/application/utilities/typeGuards.utilities';

export class FetchError implements TransferError {
  constructor(details: TransferErrorDetails) {
    this.statusCode = details.statusCode;
    if (isset(details.message)) this.message = details.message;
  }

  public statusCode: TransferErrorStatus = TRANSFER_STATUSES.UNKNOWN_ERROR;

  public message = '';
}

export const isInReadonlyArray = <T, A extends T>(array: readonly A[], item: T): item is A =>
  array.includes(item as A);
