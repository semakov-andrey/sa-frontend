import { TRANSFER_STATUSES } from '@sa-frontend/application/contracts/Transfer/Transfer.constants';
import { isset } from '@sa-frontend/application/utilities/typeGuards.utilities';

import type { TransferError, TransferErrorDetails, TransferErrorStatus } from '@sa-frontend/application/contracts/Transfer/Transfer.contracts';

export class FetchError implements TransferError {
  constructor(details: TransferErrorDetails) {
    this.statusCode = details.statusCode;
    if (isset(details.message)) this.message = details.message;
  }

  public statusCode: TransferErrorStatus = TRANSFER_STATUSES.UNKNOWN_ERROR;

  public message = '';
}

export const isInReadonlyArray = <T, A extends T>(array: ReadonlyArray<A>, item: T): item is A =>
  array.includes(item as A);
