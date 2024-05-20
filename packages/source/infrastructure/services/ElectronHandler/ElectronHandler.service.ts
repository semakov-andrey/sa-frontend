import { ipcMain, BrowserWindow } from 'electron';

import { TRANSFER_ERRORS, TRANSFER_EVENT } from '@sa-frontend/application/contracts/ResponseTransfer/ResponseTransfer.constants';
import { type ResponseTransfer, type TransferError, type TransferListenCallback } from '@sa-frontend/application/contracts/ResponseTransfer/ResponseTransfer.contracts';
import { isKeyOfObject, isTypeObject, isTypeString } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { ElectronHandlerError, isTransferParameters } from './ElectronHandler.utility';

export class ElectronHandler implements ResponseTransfer {
  public listen = (callback: TransferListenCallback): void => {
    ipcMain.on(TRANSFER_EVENT, (event: unknown, data: unknown) => {
      if (!isTypeObject(data) || !isKeyOfObject(data, 'id') || !isTypeString(data.id)) return;

      if (!isTransferParameters(data)) {
        this.response(data.id, new ElectronHandlerError(TRANSFER_ERRORS.BAD_REQUEST));
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
