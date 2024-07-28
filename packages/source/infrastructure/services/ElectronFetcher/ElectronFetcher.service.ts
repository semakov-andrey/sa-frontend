import { nanoid } from 'nanoid';

import { type EventRequest } from '@sa-frontend/application/contracts/EventRequest/EventRequest.contract';
import { EVENT_TRANSFER } from '@sa-frontend/application/contracts/EventResponse/EventResponse.constants';
import { type EventResponseParameters } from '@sa-frontend/application/contracts/EventResponse/EventResponse.contracts';
import { TRANSFER_STATUSES } from '@sa-frontend/application/contracts/Transfer/Transfer.constants';
import { type TransferError, type TransferResponseOrError, type TransferStatusCodeError } from '@sa-frontend/application/contracts/Transfer/Transfer.contracts';
import { isTransferStatusCodeError } from '@sa-frontend/application/contracts/Transfer/Transfer.utility';
import { isKeyOfObject, isTypeObject, isTypeString } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { ElectronHandlerError } from '../ElectronHandler/ElectronHandler.utility';

import { FETCHER_TIMEOUT } from './ElectronFetcher.constant';

export class ElectronFetcher implements EventRequest {
  public request = async <Data>(
    controller: string,
    method: string,
    body: unknown[]
  ): TransferResponseOrError<Data> =>
    new Promise((resolve: (value: Data | TransferError) => void) => {
      let timeout: number;
      const id = nanoid();
      const transferParameters: EventResponseParameters = { id, controller, method, body };

      window.electron.send(EVENT_TRANSFER, transferParameters);

      const unsubscribe = window.electron.on(EVENT_TRANSFER, (data: unknown) => {
        if (!isTypeObject(data) || !isKeyOfObject(data, 'id') || !isKeyOfObject(data, 'data') || data.id !== id) return;

        const { data: finalData } = data;
        if (isTypeObject(finalData)
          && isKeyOfObject(finalData, 'code')
          && isTransferStatusCodeError(finalData.code)
          && isKeyOfObject(finalData, 'message')
          && isTypeString(finalData.message)) {
          resolve(new ElectronHandlerError(finalData.code, finalData.message));
        } else {
          resolve(finalData as Data);
        }

        unsubscribe();
        window.clearTimeout(timeout);
      });

      timeout = window.setTimeout(() => {
        resolve(new ElectronHandlerError(TRANSFER_STATUSES.GATEWAY_TIMEOUT));
        unsubscribe();
      }, FETCHER_TIMEOUT);
    });

  public transferError = (code: TransferStatusCodeError, message?: string): TransferError =>
    new ElectronHandlerError(code, message);

  public isTransferError = <Data>(u: Data | TransferError): u is TransferError =>
    u instanceof ElectronHandlerError;
}
