import React, { useEffect, useRef, useState } from 'react';

import { isTypeFunction } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { useEvent } from './useEvent.hook';

export type UseStateWithCallbackReturnType<T> = [
  state: T,
  setState: SetStateWithCallbackAction<T>
];

export type SetStateWithCallbackAction<T> = (
  setStateAction: React.SetStateAction<T>,
  callback?: (updatedState: T) => void
) => void;

export const useStateWithCallback = <T>(
  initialState: T
): UseStateWithCallbackReturnType<T> => {
  const [ state, setState ] = useState<T>(initialState);
  const callbackRef = useRef<(updated: T) => void>();

  const setStateHandler = useEvent((
    setStateAction: React.SetStateAction<T>,
    callback?: (updatedState: T) => void
  ): void => {
    callbackRef.current = callback;
    setState(setStateAction);
  });

  useEffect(() => {
    if (isTypeFunction(callbackRef.current)) {
      callbackRef.current(state);
      callbackRef.current = undefined;
    }
  }, [ state ]);

  return [ state, setStateHandler ];
};
