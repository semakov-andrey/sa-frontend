import { useMemo } from 'react';

import { iocInstance, type IoCInstances } from '@sa-frontend/application/components/IoCInstance/IoCInstance';

export const useInject = <T extends keyof IoCInstances>(token: T): IoCInstances[T] =>
  useMemo(() => iocInstance.get(token), [ token ]);
