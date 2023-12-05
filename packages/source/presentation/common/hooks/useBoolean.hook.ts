import { useState } from 'react';

import { useEvent } from '@sa-frontend/presentation/common/hooks/useEvent.hook';

export type UseBooleanReturnType = [ boolean, () => void, (value: boolean) => void ];

export const useBoolean = (defaultValue: boolean): UseBooleanReturnType => {
  const [ value, setValue ] = useState(defaultValue);

  const toggleValue = useEvent(() => {
    setValue((value: boolean) => !value);
  });

  return [ value, toggleValue, setValue ];
};
