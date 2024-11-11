import { atom } from 'nanostores';

import { throttle } from '@sa-frontend/application/utilities/throttle.utility';

import { isTypeHTMLElement } from '../../utilities/typeGuards.utilities';

import type { RefObject } from 'react';

export type PressEnterStore = <T extends HTMLElement>(
  ref: RefObject<T>,
  selected: number,
  onPressEnter: (element: HTMLElement) => void
) => void;

export const pressEnterStore = atom<PressEnterStore>(
  throttle(<T extends HTMLElement>(
    ref: RefObject<T>,
    selected: number,
    onPressEnter: (element: HTMLElement) => void
  ): void => {
    const element = ref.current?.children[selected];
    if (isTypeHTMLElement(element)) onPressEnter(element);
  }, 250)
);
