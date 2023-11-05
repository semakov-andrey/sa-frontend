import { useState } from 'react';

import { useEvent } from './useEvent.hook';

export type UseStateRefReturnType<T extends HTMLElement> = [ T | null, (ref: T | null) => void ];

export const useStateRef = <T extends HTMLElement>(): UseStateRefReturnType<T> => {
  const [ ref, setRef ] = useState<T | null>(null);
  const setRefHandler = useEvent((ref: T | null) => {
    setRef(ref);
  });
  return [ ref, setRefHandler ];
};
