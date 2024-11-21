import { atom } from 'nanostores';
import { type RefObject } from 'react';

import { throttle } from '@sa-frontend/application/utilities/throttle.utility';

import { isTypeHTMLElement } from '../../utilities/typeGuards.utilities';

export type OpenStore = <T extends HTMLElement>(
  ref: RefObject<T>,
  selected: number,
  onOpen: (element: HTMLElement) => void
) => void;

export const openStore = atom<OpenStore>(
  throttle(<T extends HTMLElement>(
    ref: RefObject<T>,
    selected: number,
    onOpen: (element: HTMLElement) => void
  ): void => {
    const element = ref.current?.children[selected];
    if (isTypeHTMLElement(element)) onOpen(element);
  }, 250)
);
