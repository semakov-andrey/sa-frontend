import '@sa-frontend/infrastructure/services';

import { useRef, useState } from 'react';

import { sessionStorageUnique } from '@sa-frontend/application/contracts/ExternalStorage/ExternalStorage.constant';
import { isTypeNumber, isset, iswritten } from '@sa-frontend/application/utilities/typeGuards.utilities';
import { useEvent } from '@sa-frontend/presentation/common/hooks/useEvent.hook';

import { KEYBOARD_KEYS } from '../../components/InputDevice/InputDevice.constants/keyboard.constants';
import { useKeyboardEvent } from '../../components/InputDevice/InputDevice.hooks/useKeyboardEvent.hook';
import { isTypeHTMLElement, isTypeNode } from '../../utilities/typeGuards.utilities';
import { useInfluence } from '../useInfluence.hook';
import { useInject } from '../useInject.hook';
import { useUpdateInfluence } from '../useUpdateInfluence.hook';

import { type UseKeyboardNavigationParams, type UseKeyboardNavigationReturn } from './useKeyboardNavigation.types';

export const useKeyboardNavigation = <T extends HTMLElement>(params: UseKeyboardNavigationParams): UseKeyboardNavigationReturn<T> => {
  const {
    amount,
    storageKey,
    onPressEnter = (element: HTMLElement): void => { element.click(); },
    onClick,
    onSelect,
    isInputDeviceContext,
    timeToInactive,
    scrollIntoView = false,
    skip
  } = params;

  const sessionStorage = useInject(sessionStorageUnique);

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

  useKeyboardEvent(KEYBOARD_KEYS.ARROW_LEFT, () => {
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
  }, { skip, timeout: 100 });

  useKeyboardEvent(KEYBOARD_KEYS.ARROW_RIGHT, () => {
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
  }, { skip, timeout: 100 });

  useKeyboardEvent(KEYBOARD_KEYS.ARROW_UP, () => {
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
  }, { skip, timeout: 100 });

  useKeyboardEvent(KEYBOARD_KEYS.ARROW_DOWN, () => {
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
  }, { skip, timeout: 100 });

  useKeyboardEvent(KEYBOARD_KEYS.ENTER, () => {
    const element = ref.current?.children[selected];
    if (isTypeHTMLElement(element)) onPressEnter(element);
  }, { skip });

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
