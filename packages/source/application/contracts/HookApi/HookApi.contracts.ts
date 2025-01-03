import { type TransferError, type TransferResponseOrError } from '@sa-frontend/application/contracts/Transfer/Transfer.contracts';

import { type HTTPRequestMethods } from '../HttpRequest/HttpRequest.contracts';

export type HookApi<Api> = {
  [Controller in keyof Api]: HookApiMethods<Api[Controller]>;
};

export type HookApiMethods<ApiMethods> = keyof ApiMethods extends string
  ? {
    [Method in keyof ApiMethods]: CleanMethod<ApiMethods[Method]>;
  } & {
    [Method in keyof ApiMethods as `use${ Capitalize<Method> }`]: HookMethod<ApiMethods[Method]>;
  } & {
    [Method in keyof ApiMethods as `useMethod${ Capitalize<Method> }`]: HookLazyMethod<ApiMethods[Method]>;
  }
  : never;

export type CleanMethod<Method> = Method extends (...args: never[]) => unknown
  ? (...args: Parameters<Method>) => ReturnType<Method> extends TransferResponseOrError<infer Data>
    ? Promise<CleanMethodResult<Data>>
    : never
  : never;

export type HookMethod<Method> = Method extends (...args: never[]) => unknown
  ? (...args: Parameters<Method>) => ReturnType<Method> extends TransferResponseOrError<infer Data>
    ? HookMethodResult<Data>
    : never
  : never;

export type HookLazyMethod<Method> = Method extends (...args: never[]) => unknown
  ? () => ReturnType<Method> extends TransferResponseOrError<infer Data>
    ? HookLazyMethodResult<Data, Parameters<Method>>
    : never
  : never;

export interface CleanMethodResult<Data> {
  data?: Data;
  error?: TransferError;
}

export interface HookMethodResult<Data> {
  data?: Data;
  error?: TransferError;
  isLoading: boolean;
  refetch: () => void;
}

export type HookLazyMethodResult<Data, Params> = [
  mutation: (...args: Params extends unknown[] ? Params : unknown[]) => Promise<CleanMethodResult<Data>>,
  isLoading: boolean
];

export type ConfigApi<Api, ValidationTokens> = {
  [Controller in keyof Api]: {
    [Method in keyof Api[Controller]]: {
      url: Api[Controller][Method] extends (params: { query: infer R }) => unknown
        ? (query: R) => string
        : () => string,
      method?: HTTPRequestMethods,
      readAsArrayBuffer?: boolean,
      reviver?: (_: string, value: unknown) => unknown
    } & (Api[Controller][Method] extends (params: never) => TransferResponseOrError<infer R>
      ? unknown extends R
        ? unknown
        : { token: keyof {
          [K in keyof ValidationTokens as ValidationTokens[K] extends R ? K : never]: never
        } }
      : unknown
    );
  }
};
