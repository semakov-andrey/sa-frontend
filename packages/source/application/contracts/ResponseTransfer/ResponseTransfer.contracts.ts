export interface ResponseTransfer {
  listen: (callback: TransferListenCallback) => void;
  response: (id: string, data: unknown) => void;
  isTransferError: <Data>(u: Data | TransferError) => u is TransferError;
}

export type TransferListenCallback = (params: TransferParameters) => void;

export interface TransferParameters {
  id: string;
  controller: string;
  method: string;
  body: unknown[];
}

export type TransferResponseOrError<Data> = Promise<Data | TransferError>;

export interface TransferError {
  type: 'transferError';
  message: string;
}
