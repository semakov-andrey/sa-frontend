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
  amount?: number;
  localStorageKey?: string;
  sessionStorageKey?: string;
  onPressEnter?: (element: HTMLElement) => void;
  onClick?: (element: HTMLElement) => void;
  timeToInactive?: number;
  scrollIntoView?: boolean;
  skip?: boolean;
}

export interface UseGamesNavigationReturn<T> {
  ref: React.RefObject<T>;
  selected: number;
  setSelected: (selected: number) => void;
  setSelectedNotChangingVisible: (selected: number) => void;
  isSelectedVisible: boolean;
  setSelectedVisible: (isSelectedVisible: boolean) => void;
}

export const useKeyboardNavigation = <T extends HTMLElement>(params: UseGamesNavigationParams): UseGamesNavigationReturn<T> => {
  const {
    amount,
    localStorageKey,
    sessionStorageKey,
    onPressEnter = (element: HTMLElement): void => { element.click(); },
    onClick,
    timeToInactive,
    scrollIntoView = false,
    skip
  } = params;

  const ref = useRef<T>(null);

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
  const dontChangeVisibleState = useRef(false);
  const visibilityTimeout = useRef(0);

  const setSelectedNotChangingVisible = useEvent((selected: number) => {
    dontChangeVisibleState.current = true;
    setSelected(selected);
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

  const activeInactiveSwitch = useEvent((enable: boolean): (() => void) => {
    if (enable) {
      if (scrollIntoView) {
        ref.current?.children[selected]?.scrollIntoView({ block: 'center' });
      }
      setSelectedVisible(true);
    }
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
  }, { skip, timeout: 100 });

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
  }, { skip, timeout: 100 });

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
  }, { skip, timeout: 100 });

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
  }, { skip, timeout: 100 });

  useKeyboardEvent(KEYBOARD_KEYS.ENTER, () => {
    const element = ref.current?.children[selected];
    if (isTypeHTMLElement(element)) onPressEnter(element);
  }, { skip });

  useEffect(() => {
    if (isset(localStorageKey)) localStorage.set(localStorageKey, selected);
    if (isset(sessionStorageKey)) sessionStorage.set(sessionStorageKey, selected);
  }, [ localStorage, localStorageKey, sessionStorage, sessionStorageKey, selected ]);

  useUpdateEffect(() => {
    if (dontChangeVisibleState.current) {
      dontChangeVisibleState.current = false;
      return isset(timeToInactive) ? activeInactiveSwitch(false) : undefined;
    }

    return isset(timeToInactive) ? activeInactiveSwitch(true) : undefined;
  }, [ selected, timeToInactive ]);


  const getElement = useEvent((event: MouseEvent): Element | undefined => {
    const elements = Array.from(ref.current?.children ?? []);
    const index = elements
      .findIndex((child: Element) => isTypeNode(event.target) && child.contains(event.target));
    const element = elements[index];
    if (isTypeHTMLElement(element)) {
      dontChangeVisibleState.current = true;
      setSelected(index);
    }
    return element;
  });

  const clickHandler = useEvent((event: MouseEvent): void => {
    const element = getElement(event);
    if (!isTypeHTMLElement(element)) return;
    onClick?.(element);
  });

  const mouseEnterHandler = useEvent((event: MouseEvent): void => {
    const element = getElement(event);
    if (!isTypeHTMLElement(element)) return;
    setSelectedVisible(true);
  });

  const mouseLeaveHandler = useEvent((event: MouseEvent): void => {
    const element = getElement(event);
    if (!isTypeHTMLElement(element)) return;
    setSelectedVisible(false);
  });

  useEffect(() => {
    ref.current?.addEventListener('click', clickHandler);
    ref.current?.addEventListener('mouseenter', mouseEnterHandler, true);
    ref.current?.addEventListener('mouseleave', mouseLeaveHandler, true);

    return () => {
      ref.current?.removeEventListener('click', clickHandler);
      ref.current?.removeEventListener('mouseenter', mouseEnterHandler, true);
      ref.current?.addEventListener('mouseleave', mouseLeaveHandler, true);
    };
  }, [ ref ]);

  return {
    ref,
    selected,
    setSelected,
    setSelectedNotChangingVisible,
    isSelectedVisible,
    setSelectedVisible
  };
};
