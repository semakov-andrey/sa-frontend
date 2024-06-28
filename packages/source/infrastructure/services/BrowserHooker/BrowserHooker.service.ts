import { useState } from 'react';

import { type CleanMethodResult, type ConfigApi, type HookApi, type HookLazyMethodResult, type HookMethodResult } from '@sa-frontend/application/contracts/HookApi/HookApi.contracts';
import { type HttpRequest, type HttpRequestBody } from '@sa-frontend/application/contracts/HttpRequest/HttpRequest.contracts';
import { type TransferError } from '@sa-frontend/application/contracts/Transfer/Transfer.contracts';
import { deCapitalize } from '@sa-frontend/application/utilities/deCapitalize.utility';
import { isTypeObject } from '@sa-frontend/application/utilities/typeGuards.utilities';
import { useDeepInfluence } from '@sa-frontend/presentation/common/hooks/useDeepInfluence.hook';
import { useEvent } from '@sa-frontend/presentation/common/hooks/useEvent.hook';

export const request = <
  Api,
  Controller extends keyof Api,
  MethodName extends keyof Api[Controller]
>(
  fetcher: HttpRequest,
  config: ConfigApi<Api>,
  controller: Controller,
  method: MethodName
) => async (
  ...args: unknown[]
): Promise<CleanMethodResult<unknown>> => {
  const { query, body } = (isTypeObject(args[0]) ? args[0] : {}) as { query?: unknown, body?: HttpRequestBody };
  const result = await fetcher.go({
    method: config[controller][method].method,
    url: config[controller][method].url(query),
    body,
    options: {
      readAsArrayBuffer: config[controller][method].readAsArrayBuffer
    }
  });
  return {
    [!fetcher.isTransferError(result) ? 'data' : 'error']: result
  };
};

export const hook = <
  Api,
  Controller extends keyof Api,
  MethodName extends string
>(
  fetcher: HttpRequest,
  config: ConfigApi<Api>,
  controller: Controller,
  methodName: MethodName
) => (...args: unknown[]): HookMethodResult<unknown> => {
  const [ data, setData ] = useState<unknown | undefined>();
  const [ error, setError ] = useState<TransferError | undefined>();
  const [ isLoading, setLoading ] = useState(false);

  const method = deCapitalize(methodName.slice(3)) as keyof Api[Controller];

  const refetch = useEvent(async () => {
    setData(undefined);
    setLoading(true);
    const result = await request(fetcher, config, controller, method)(...args);
    if ('data' in result) {
      setData(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  });

  useDeepInfluence(() => {
    refetch();
  }, [ refetch, ...args ]);

  return { data, error, isLoading, refetch };
};

export const methodHook = <
  Api,
  Controller extends keyof Api,
  MethodName extends string
>(
  fetcher: HttpRequest,
  config: ConfigApi<Api>,
  controller: Controller,
  methodName: MethodName
) => (): HookLazyMethodResult<unknown, unknown> => {
  const [ isLoading, setLoading ] = useState(false);

  const method = deCapitalize(methodName.slice(9)) as keyof Api[Controller];

  const handler = useEvent(async (...args: unknown[]) => {
    setLoading(true);
    const result = await request(fetcher, config, controller, method)(...args);
    setLoading(false);
    return result;
  });

  return [ handler, isLoading ];
};

export const BrowserHooker = <Api>(fetcher: HttpRequest, config: ConfigApi<Api>): HookApi<Api> => {
  type HookerResult = HookApi<Api>;
  return new Proxy({} as HookerResult, {
    get: <Controller extends keyof Api & string>(
      _: HookerResult,
      controller: Controller
    ): HookerResult[Controller] =>
      new Proxy({} as HookerResult[Controller], {
        get: <MethodName extends keyof Api[Controller] & string>(
          _: HookerResult[Controller],
          method: MethodName
        ) =>
          method.startsWith('useMethod')
            ? methodHook(fetcher, config, controller, method)
            : method.startsWith('use')
              ? hook(fetcher, config, controller, method)
              : request(fetcher, config, controller, method)
      })
  });
};
