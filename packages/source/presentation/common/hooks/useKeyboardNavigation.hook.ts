import '@sa-frontend/infrastructure/services';

import { useEffect, useRef, useState } from 'react';

import { localStorageUnique, sessionStorageUnique } from '@sa-frontend/application/contracts/ExternalStorage/ExternalStorage.constant';
import { isTypeNumber, isset, iswritten } from '@sa-frontend/application/utilities/typeGuards.utilities';
import { KEYBOARD_KEYS } from '@sa-frontend/presentation/common/constants/keys.constant';
import { useEvent } from '@sa-frontend/presentation/common/hooks/useEvent.hook';
import { useKeyboardEvent } from '@sa-frontend/presentation/common/hooks/useKeyboardEvent.hook/useKeyboardEvent.hook';

import { isTypeHTMLElement, isTypeNode } from '../utilities/typeGuards.utilities';

import { useInject } from './useInject.hook';
import { useUpdateEffect } from './useUpdateEffect.hook';

export interface UseGamesNavigationParams {
  container: HTMLElement | null;
  amount?: number;
  localStorageKey?: string;
  sessionStorageKey?: string;
  onPressEnter?: (element: HTMLElement) => void;
  onClick?: (element: HTMLElement) => void;
  timeToInactive?: number;
  scrollIntoView?: boolean;
}

export interface UseGamesNavigationReturn {
  selected: number;
  setSelected: (selected: number) => void;
  isSelectedVisible: boolean;
  setSelectedVisible: (isSelectedVisible: boolean) => void;
}

export const useKeyboardNavigation = (params: UseGamesNavigationParams): UseGamesNavigationReturn => {
  const {
    container,
    amount,
    localStorageKey,
    sessionStorageKey,
    onPressEnter,
    onClick,
    timeToInactive,
    scrollIntoView = false
  } = params;

  const localStorage = useInject(localStorageUnique);
  const sessionStorage = useInject(sessionStorageUnique);

  const valueFromLocalStorage = isset(localStorageKey)
    ? localStorage.get(localStorageKey)
    : undefined;
  const valueFromSessionStorage = isset(sessionStorageKey)
    ? sessionStorage.get(sessionStorageKey)
    : undefined;
  const initialSelected = isTypeNumber(valueFromLocalStorage)
    ? valueFromLocalStorage
    : isTypeNumber(valueFromSessionStorage)
      ? valueFromSessionStorage
      : 0;

  const [ selected, setSelected ] = useState(initialSelected);
  const [ isSelectedVisible, setSelectedVisible ] = useState(false);
  const isSelectedChangedByClickRef = useRef(false);
  const visibilityTimeout = useRef(0);

  const getItemsInRow = useEvent(() => {
    const firstChild = container?.firstChild;
    if (!iswritten(container) || !(firstChild instanceof HTMLElement)) return 1;

    const { paddingLeft, paddingRight } = window.getComputedStyle(container);
    const { width } = window.getComputedStyle(firstChild);

    return Math.floor((container.clientWidth - parseInt(paddingLeft, 10) - parseInt(paddingRight, 10)) / parseInt(width, 10));
  });

  const getAmount = useEvent(() => amount ?? container?.children.length ?? 0);

  const activeInactiveSwitch = useEvent((enable: boolean): (() => void) => {
    if (enable) setSelectedVisible(true);
    window.clearTimeout(visibilityTimeout.current);
    visibilityTimeout.current = window.setTimeout(() => {
      setSelectedVisible(false);
    }, timeToInactive);

    return () => {
      window.clearTimeout(visibilityTimeout.current);
    };
  });

  useKeyboardEvent(KEYBOARD_KEYS.ARROW_LEFT, () => {
    if (!isSelectedVisible) {
      activeInactiveSwitch(true);
      return;
    }
    const amount = getAmount();
    const itemsInRow = getItemsInRow();
    const itemsInCurrentRow = selected >= Math.floor(amount / itemsInRow) * itemsInRow
      ? amount % itemsInRow
      : itemsInRow;
    setSelected(selected % itemsInRow === 0 ? selected + itemsInCurrentRow - 1 : selected - 1);
  }, { timeout: 100 });

  useKeyboardEvent(KEYBOARD_KEYS.ARROW_RIGHT, () => {
    if (!isSelectedVisible) {
      activeInactiveSwitch(true);
      return;
    }
    const amount = getAmount();
    const itemsInRow = getItemsInRow();
    const itemsInCurrentRow = selected >= Math.floor(amount / itemsInRow) * itemsInRow
      ? amount % itemsInRow
      : itemsInRow;
    setSelected(selected % itemsInRow === itemsInCurrentRow - 1 ? selected - itemsInCurrentRow + 1 : selected + 1);
  }, { timeout: 100 });

  useKeyboardEvent(KEYBOARD_KEYS.ARROW_UP, () => {
    if (!isSelectedVisible) {
      activeInactiveSwitch(true);
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
  }, { timeout: 100 });

  useKeyboardEvent(KEYBOARD_KEYS.ARROW_DOWN, () => {
    if (!isSelectedVisible) {
      activeInactiveSwitch(true);
      return;
    }
    const amount = getAmount();
    const itemsInRow = getItemsInRow();
    if (amount <= itemsInRow) return;
    setSelected(selected + itemsInRow > amount - 1
      ? selected % itemsInRow
      : selected + itemsInRow);
  }, { timeout: 100 });

  useKeyboardEvent(KEYBOARD_KEYS.ENTER, () => {
    const element = container?.children[selected];
    if (isTypeHTMLElement(element)) onPressEnter?.(element);
  });

  useEffect(() => {
    if (isset(localStorageKey)) localStorage.set(localStorageKey, selected);
    if (isset(sessionStorageKey)) sessionStorage.set(sessionStorageKey, selected);
  }, [ localStorage, localStorageKey, sessionStorage, sessionStorageKey, selected ]);

  useUpdateEffect(() => {
    if (isSelectedChangedByClickRef.current) {
      isSelectedChangedByClickRef.current = false;
      return isset(timeToInactive) ? activeInactiveSwitch(false) : undefined;
    }

    if (scrollIntoView) {
      container?.children[selected]?.scrollIntoView({ block: 'center' });
    }

    return isset(timeToInactive) ? activeInactiveSwitch(true) : undefined;
  }, [ selected, timeToInactive ]);

  useEffect(() => {
    const handler = (event: MouseEvent): void => {
      const elements = Array.from(container?.children ?? []);
      const index = elements
        .findIndex((child: Element) => isTypeNode(event.target) && child.contains(event.target));
      const element = elements[index];
      if (isTypeHTMLElement(element)) {
        isSelectedChangedByClickRef.current = true;
        setSelected(index);
        onClick?.(element);
      }
    };
    container?.addEventListener('click', handler);

    return () => {
      container?.removeEventListener('click', handler);
    };
  }, [ container ]);

  return { selected, setSelected, isSelectedVisible, setSelectedVisible };
};
