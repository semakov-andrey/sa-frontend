import { useStore } from '@nanostores/react';

import { isset } from '@sa-frontend/application/utilities/typeGuards.utilities';

import { useEvent } from '../../../hooks/useEvent.hook';
import { useInfluence } from '../../../hooks/useInfluence.hook';
import { keyboardHandlersStore, type Handler } from '../InputDevice.stores/keyboardHandlers.store';
import { getButton } from '../InputDevice.utility';

export const useKeyboard = (): void => {
  const keyboardHandlers = useStore(keyboardHandlersStore);

  const catchPressings = useEvent((event: KeyboardEvent) => {
    if (event.target instanceof HTMLInputElement
      || event.target instanceof HTMLTextAreaElement) return;

    const button = getButton(event);
    const handlers = button in keyboardHandlers ? keyboardHandlers[button] : undefined;
    if (!isset(handlers)) return;

    handlers.forEach((handler: Handler) => {
      event.preventDefault();
      event.stopPropagation();
      handler(event);
    });
  });

  useInfluence(() => {
    document.documentElement.addEventListener('keydown', catchPressings);

    return (): void => {
      document.documentElement.removeEventListener('keydown', catchPressings);
    };
  }, [ catchPressings ]);
};
