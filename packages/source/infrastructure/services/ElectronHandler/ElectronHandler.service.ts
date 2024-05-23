import { ipcMain, BrowserWindow } from 'electron';

import { TRANSFER_EVENT } from '@sa-frontend/application/contracts/ResponseTransfer/ResponseTransfer.constants';
import { type ResponseTransfer, type TransferListenCallback } from '@sa-frontend/application/contracts/ResponseTransfer/ResponseTransfer.contracts';
import { TRANSFER_STATUSES } from '@sa-frontend/application/contracts/Transfer/Transfer.constants';
import { type TransferError } from '@sa-frontend/application/contracts/Transfer/Transfer.contracts';
import { isKeyOfObject, isTypeObject, isTypeString } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { ElectronHandlerError, isTransferParameters } from './ElectronHandler.utility';

export class ElectronHandler implements ResponseTransfer {
  public listen = (callback: TransferListenCallback): void => {
    ipcMain.on(TRANSFER_EVENT, (event: unknown, data: unknown) => {
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
      window.webContents.send(TRANSFER_EVENT, { id, data });
    });
  };

  public isTransferError = <Data>(u: Data | TransferError): u is TransferError =>
    u instanceof ElectronHandlerError;
}
