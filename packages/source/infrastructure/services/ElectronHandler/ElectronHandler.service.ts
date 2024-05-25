import { ipcMain, BrowserWindow } from 'electron';

import { EVENT_TRANSFER } from '@sa-frontend/application/contracts/EventResponse/EventResponse.constants';
import { type EventResponse, type EventResponseListenCallback } from '@sa-frontend/application/contracts/EventResponse/EventResponse.contracts';
import { TRANSFER_STATUSES } from '@sa-frontend/application/contracts/Transfer/Transfer.constants';
import { type TransferError, type TransferStatusCodeError } from '@sa-frontend/application/contracts/Transfer/Transfer.contracts';
import { isKeyOfObject, isTypeObject, isTypeString } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { ElectronHandlerError, isTransferParameters } from './ElectronHandler.utility';

export class ElectronHandler implements EventResponse {
  public listen = (callback: EventResponseListenCallback): void => {
    ipcMain.on(EVENT_TRANSFER, (event: unknown, data: unknown) => {
      if (!isTypeObject(data) || !isKeyOfObject(data, 'id') || !isTypeString(data.id)) return;

      if (!isTransferParameters(data)) {
        this.response(data.id, new ElectronHandlerError(TRANSFER_STATUSES.BAD_REQUEST));
        return;
      }

      callback(data);
    });
  };

  public response = (id: string, data: unknown): void => {
    const windows = BrowserWindow.getAllWindows();
    windows.forEach((window: Electron.BrowserWindow) => {
      window.webContents.send(EVENT_TRANSFER, { id, data });
    });
  };

  public transferError = (code: TransferStatusCodeError, message?: string): TransferError =>
    new ElectronHandlerError(code, message);

  public isTransferError = <Data>(u: Data | TransferError): u is TransferError =>
    u instanceof ElectronHandlerError;
}
