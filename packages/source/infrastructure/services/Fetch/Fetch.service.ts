import {
  TRANSFER_ERROR_STATUSES,
  TRANSFER_METHODS,
  TRANSFER_STATUSES
} from '@sa-frontend/application/contracts/Transfer/Transfer.constants';
import {
  type TransferError,
  type TransferResponseOrError,
  type Transfer,
  type TransferBody,
  type TransferOptions,
  type TransferSettings,
  type TransferSuccessStatus,
  type TransferErrorStatus
} from '@sa-frontend/application/contracts/Transfer/Transfer.contracts';
import {
  isexists,
  isset,
  isTypeBoolean,
  isTypeNumber,
  isTypeObject,
  isTypeString,
  iswritten
} from '@sa-frontend/application/utilities/typeGuards.utilities';

import { FetchError, isInReadonlyArray } from './Fetch.utilities';

export class Fetch implements Transfer {
  constructor(options: TransferOptions = {}) {
    this.parseDates = options.parseDates;
  }

  private parseDates;

  public go = async <T>(settings: TransferSettings): TransferResponseOrError<T> => {
    const { method = TRANSFER_METHODS.GET, url, body, options } = settings;
    const data = this.getData(settings);
    const query = method === TRANSFER_METHODS.GET ? this.getQuery(body) : '';

    try {
      const response = await window.fetch(`${ url }${ query }`, data);
      const { status } = response;

      if (!this.statusTypeCheck(status)) {
        return new FetchError({ statusCode: TRANSFER_STATUSES.UNKNOWN_ERROR });
      }

      return !isInReadonlyArray(TRANSFER_ERROR_STATUSES, status)
        ? await this.transformData(response, options, status === TRANSFER_STATUSES.NO_CONTENT)
        : await this.transformError(response, status);
    } catch (e: unknown) {
      return new FetchError({ statusCode: TRANSFER_STATUSES.UNKNOWN_ERROR });
    }
  };

  public getData = (settings: TransferSettings): RequestInit => {
    const { method, body, headers, options } = settings;
    return {
      method,
      ...!(body instanceof FormData)
        ? {
          headers: {
            'Accept': 'application/json',
            'Content-Type': Boolean(options?.readAsArrayBuffer)
              ? 'application/octet-stream'
              : method !== TRANSFER_METHODS.PATCH
                ? 'application/json'
                : 'application/json-patch+json',
            ...headers
          }
        }
        : {},
      mode: 'cors',
      ...body instanceof FormData
        ? { body }
        : method !== TRANSFER_METHODS.GET && (isTypeObject(body) || Array.isArray(body))
          ? { body: JSON.stringify(body) }
          : {}
    };
  };

  public getQuery = (body?: TransferBody): string => {
    if (!isset(body) || body instanceof FormData) return '';

    const query = this.serialize(body);

    return query.length > 0 ? `?${ query.join('&') }` : '';
  };

  private serialize = (body: OneOrMore<object>, prefix?: string | number): string[] => {
    const params: string[] = [];
    Object.entries(body).forEach(([ key, value ]: [ string, object | unknown]): void => {
      if (!isexists(value) && !isset(prefix)) {
        return;
      }
      const k = isset(prefix) ? `${ prefix }[${ key }]` : key;
      if (this.serializeTypeCheck1(value)) {
        params.push(`${ encodeURIComponent(k) }=${ encodeURIComponent(String(value)) }`);
      }
      if (this.serializeTypeCheck2(value)) {
        params.push(...this.serialize(value, key));
      }
    });

    return params;
  };

  private serializeTypeCheck1 = (value: unknown): value is Absent<string | number | boolean> =>
    isTypeString(value) || isTypeNumber(value) || isTypeBoolean(value) || !iswritten(value) || !isset(value);

  private serializeTypeCheck2 = (value: unknown): value is OneOrMore<object> =>
    isTypeObject(value) || Array.isArray(value);

  private statusTypeCheck = (status: number): status is TransferSuccessStatus | TransferErrorStatus =>
    Object.values(TRANSFER_STATUSES).includes(status);

  private transformData = async <T>(response: Response, options: TransferSettings['options'], is204: boolean = false): TransferResponseOrError<T> => {
    if (is204) return '' as unknown as T;

    try {
      if (Boolean(options?.readAsArrayBuffer)) {
        return await response.arrayBuffer() as T;
      }

      const text = await response.text();
      const contentType = response.headers.get('Content-Type');
      if (!Boolean(contentType?.includes('application/json'))) return text as T;

      return JSON.parse(text, isset(this.parseDates) ? this.parseDates : undefined) as T;
    } catch {
      return new FetchError({ statusCode: TRANSFER_STATUSES.UNKNOWN_ERROR });
    }
  };

  private transformError = async (response: Response, statusCode: TransferErrorStatus): Promise<TransferError> => {
    try {
      const text = await response.text();
      const json: unknown = JSON.parse(text);
      return new FetchError({
        statusCode,
        message: isTypeObject(json) && isTypeString(json.message)
          ? json.message
          : undefined
      });
    } catch {
      return new FetchError({ statusCode: TRANSFER_STATUSES.UNKNOWN_ERROR });
    }
  };

  public isTransferError = <T>(u: T | TransferError): u is TransferError =>
    u instanceof FetchError;
};

