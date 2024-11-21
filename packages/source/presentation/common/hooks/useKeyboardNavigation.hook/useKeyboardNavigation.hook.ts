import '@sa-frontend/infrastructure/services';

import { useStore } from '@nanostores/react';
import { useRef, useState } from 'react';

import { sessionStorageUnique } from '@sa-frontend/application/contracts/ExternalStorage/ExternalStorage.constant';
import { isTypeNumber, isset, iswritten } from '@sa-frontend/application/utilities/typeGuards.utilities';
import { useEvent } from '@sa-frontend/presentation/common/hooks/useEvent.hook';

import { GAMEPAD_KEYS } from '../../components/InputDevice/InputDevice.constants/gamepad.constants';
import { COMBINATION_SEPARATOR, KEYBOARD_KEYS, SPECIAL_KEYS } from '../../components/InputDevice/InputDevice.constants/keyboard.constants';
import { useInputDeviceEvent } from '../../components/InputDevice/InputDevice.hooks/useInputDeviceEvent.hook';
import { addGamepadHandler, removeGamepadHandler } from '../../components/InputDevice/InputDevice.stores/gamepadHandlers.store';
import { addKeyboardHandler, removeKeyboardHandler } from '../../components/InputDevice/InputDevice.stores/keyboardHandlers.store';
import { isTypeHTMLElement, isTypeNode } from '../../utilities/typeGuards.utilities';
import { useInfluence } from '../useInfluence.hook';
import { useInject } from '../useInject.hook';
import { useUpdateInfluence } from '../useUpdateInfluence.hook';

import { openStore } from './useKeyboardNavigation.store';
import { type UseKeyboardNavigationParams, type UseKeyboardNavigationReturn } from './useKeyboardNavigation.types';

export const useKeyboardNavigation = <T extends HTMLElement>(params: UseKeyboardNavigationParams): UseKeyboardNavigationReturn<T> => {
  const {
    amount,
    storageKey,
    onOpen = (element: HTMLElement): void => { element.click(); },
    onClick,
    onSelect,
    isInputDeviceContext,
    timeToInactive,
    scrollIntoView = false,
    skip
  } = params;

  const sessionStorage = useInject(sessionStorageUnique);
  const open = useStore(openStore);

  const valueFromStorage = isset(storageKey)
    ? sessionStorage.get(storageKey)
    : undefined;
  const initialSelected = isTypeNumber(valueFromStorage)
    ? valueFromStorage
    : 0;

  const [ selected, setSelectedLocal ] = useState(initialSelected);
  const [ isSelectedVisible, setSelectedVisible ] = useState(!isset(timeToInactive) || Boolean(isInputDeviceContext));

  const ref = useRef<T>(null);
  const visibilityTimeout = useRef(0);

  const setSelected = useEvent((selected: number) => {
    setSelectedLocal(selected);
    activeInactiveSwitch(true);
    onSelect?.();
    if (isset(storageKey)) sessionStorage.set(storageKey, selected);
    if (scrollIntoView) {
      ref.current?.children[selected]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  });

  const setSelectedKeepingVisibility = useEvent((selected: number) => {
    setSelectedLocal(selected);
    if (isset(storageKey)) sessionStorage.set(storageKey, selected);
  });

  const getAmount = useEvent(() => amount ?? ref.current?.children.length ?? 0);

  const getItemsInRow = useEvent(() => {
    const firstChild = ref.current?.firstChild;
    if (!iswritten(ref.current) || !(firstChild instanceof HTMLElement)) return 1;

    const { paddingLeft, paddingRight, columnGap } = window.getComputedStyle(ref.current);
    const { width } = window.getComputedStyle(firstChild);
    const paddingLeftNumbered = parseInt(paddingLeft, 10);
    const paddingRightNumbered = parseInt(paddingRight, 10);
    const widthNumbered = parseInt(width, 10);
    const columnGapNumbered = !Number.isNaN(parseInt(columnGap, 10)) ? parseInt(columnGap, 10) : 0;

    const amount = getAmount();
    const itemsInRow = Math.floor(
      (ref.current.clientWidth + columnGapNumbered - paddingLeftNumbered - paddingRightNumbered) / (widthNumbered + columnGapNumbered)
    );
    return amount > itemsInRow ? itemsInRow : amount;
  });

  const activeInactiveSwitch = useEvent((set: boolean) => {
    if (set) setSelectedVisible(true);
    window.clearTimeout(visibilityTimeout.current);

    if (isset(isInputDeviceContext) && set) return;
    if (!isset(timeToInactive)) return;

    visibilityTimeout.current = window.setTimeout(() => {
      setSelectedVisible(false);
      window.clearTimeout(visibilityTimeout.current);
    }, timeToInactive);
  });

  const getElement = useEvent((event: MouseEvent): Element | undefined => {
    const elements = Array.from(ref.current?.children ?? []);
    const index = elements
      .findIndex((child: Element) => isTypeNode(event.target) && child.contains(event.target));
    const element = elements[index];
    if (isTypeHTMLElement(element)) {
      setSelectedKeepingVisibility(index);
    }
    return element;
  });

  const clickHandler = useEvent((event: MouseEvent): void => {
    const element = getElement(event);
    if (!isTypeHTMLElement(element)) return;
    onClick?.(element);
  });

  const openHandler = useEvent((): void => {
    open(ref, selected, onOpen);
  });

  useInputDeviceEvent(KEYBOARD_KEYS.ARROW_LEFT, GAMEPAD_KEYS.LEFT, () => {
    if (!isSelectedVisible) {
      activeInactiveSwitch(true);
      onSelect?.();
      return;
    }
    const amount = getAmount();
    const itemsInRow = getItemsInRow();
    const itemsInCurrentRow = selected >= Math.floor(amount / itemsInRow) * itemsInRow
      ? amount % itemsInRow
      : itemsInRow;
    setSelected(selected % itemsInRow === 0 ? selected + itemsInCurrentRow - 1 : selected - 1);
  }, { skip });

  useInputDeviceEvent(KEYBOARD_KEYS.ARROW_RIGHT, GAMEPAD_KEYS.RIGHT, () => {
    if (!isSelectedVisible) {
      activeInactiveSwitch(true);
      onSelect?.();
      return;
    }
    const amount = getAmount();
    const itemsInRow = getItemsInRow();
    const itemsInCurrentRow = selected >= Math.floor(amount / itemsInRow) * itemsInRow
      ? amount % itemsInRow
      : itemsInRow;
    setSelected(selected % itemsInRow === itemsInCurrentRow - 1 ? selected - itemsInCurrentRow + 1 : selected + 1);
  }, { skip });

  useInputDeviceEvent(KEYBOARD_KEYS.ARROW_UP, GAMEPAD_KEYS.UP, () => {
    if (!isSelectedVisible) {
      activeInactiveSwitch(true);
      onSelect?.();
      return;
    }
    const amount = getAmount();
    const itemsInRow = getItemsInRow();
    if (amount <= itemsInRow) return;
    setSelected(selected - itemsInRow < 0
      ? amount % itemsInRow > selected % itemsInRow
        ? amount - amount % itemsInRow + selected
        : amount - amount % itemsInRow - itemsInRow + selected
      : selected - itemsInRow);
  }, { skip });

  useInputDeviceEvent(KEYBOARD_KEYS.ARROW_DOWN, GAMEPAD_KEYS.DOWN, () => {
    if (!isSelectedVisible) {
      activeInactiveSwitch(true);
      onSelect?.();
      return;
    }
    const amount = getAmount();
    const itemsInRow = getItemsInRow();
    if (amount <= itemsInRow) return;
    setSelected(selected + itemsInRow > amount - 1
      ? selected % itemsInRow
      : selected + itemsInRow);
  }, { skip });

  useInfluence(() => {
    if (Boolean(skip)) return;
    const openKey = [
      SPECIAL_KEYS.CMD,
      COMBINATION_SEPARATOR,
      KEYBOARD_KEYS.ARROW_DOWN
    ].join('');
    const openButton = GAMEPAD_KEYS.A;
    addKeyboardHandler(openKey, openHandler);
    addGamepadHandler(openButton, openHandler);
    return (): void => {
      removeKeyboardHandler(openKey, openHandler);
      removeGamepadHandler(openButton, openHandler);
    };
  }, [ skip, openHandler ]);

  useInfluence(() => {
    ref.current?.addEventListener('click', clickHandler);
    return () => {
      ref.current?.removeEventListener('click', clickHandler);
    };
  }, [ ref, clickHandler ]);

  useUpdateInfluence(() => {
    activeInactiveSwitch(Boolean(isInputDeviceContext));
  }, [ isInputDeviceContext, activeInactiveSwitch ]);

  return {
    ref,
    selected,
    setSelected,
    setSelectedKeepingVisibility,
    isSelectedVisible
  };
};
