import { useState } from 'react';

import { type EventRequest } from '@sa-frontend/application/contracts/EventRequest/EventRequest.contract';
import {
  type CleanMethodResult,
  type HookMethodResult,
  type HookLazyMethodResult,
  type HookApi
} from '@sa-frontend/application/contracts/HookApi/HookApi.contracts';
import { type TransferError } from '@sa-frontend/application/contracts/Transfer/Transfer.contracts';
import { deCapitalize } from '@sa-frontend/application/utilities/deCapitalize.utility';
import { useDeepInfluence } from '@sa-frontend/presentation/common/hooks/useDeepInfluence.hook';
import { useEvent } from '@sa-frontend/presentation/common/hooks/useEvent.hook';

export const request = <
  Controller extends string,
  MethodName extends string
>(
  fetcher: EventRequest,
  controller: Controller,
  method: MethodName
) => async (
  ...args: unknown[]
): Promise<CleanMethodResult<unknown>> => {
  const result = await fetcher.request(controller, method, args);
  return {
    [!fetcher.isTransferError(result) ? 'data' : 'error']: result
  };
};

export const hook = <
  Controller extends string,
  MethodName extends string
>(
  fetcher: EventRequest,
  controller: Controller,
  methodName: MethodName
) => (...args: unknown[]): HookMethodResult<unknown> => {
  const [ data, setData ] = useState<unknown | undefined>();
  const [ error, setError ] = useState<TransferError | undefined>();
  const [ isLoading, setLoading ] = useState(false);

  const method = deCapitalize(methodName.slice(3));

  const refetch = useEvent(async () => {
    setData(undefined);
    setLoading(true);
    const result = await request(fetcher, controller, method)(...args);
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
  Controller extends string,
  MethodName extends string
>(
  fetcher: EventRequest,
  controller: Controller,
  methodName: MethodName
) => (): HookLazyMethodResult<unknown, unknown> => {
  const [ isLoading, setLoading ] = useState(false);

  const method = deCapitalize(methodName.slice(9));

  const handler = useEvent(async (...args: unknown[]) => {
    setLoading(true);
    const result = await request(fetcher, controller, method)(...args);
    setLoading(false);
    return result;
  });

  return [ handler, isLoading ];
};

export const ElectronHooker = <Api>(fetcher: EventRequest): HookApi<Api> => {
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
            ? methodHook(fetcher, controller, method)
            : method.startsWith('use')
              ? hook(fetcher, controller, method)
              : request(fetcher, controller, method)
      })
  });
};
