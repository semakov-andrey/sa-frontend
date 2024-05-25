import { type TransferError, type TransferStatusCodeError } from '../Transfer/Transfer.contracts';

export interface EventResponse {
  listen: (callback: EventResponseListenCallback) => void;
  response: (id: string, data: unknown) => void;
  transferError: (code: TransferStatusCodeError, message?: string) => TransferError;
  isTransferError: <Data>(u: Data | TransferError) => u is TransferError;
}

export type EventResponseListenCallback = (params: EventResponseParameters) => void;

export interface EventResponseParameters {
  id: string;
  controller: string;
  method: string;
  body: unknown[];
}
