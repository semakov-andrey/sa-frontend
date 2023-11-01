export const isTypeNode = (element: unknown): element is Node =>
  element instanceof Node;

export const isTypeElement = (element: unknown): element is HTMLElement =>
  element instanceof Element;

export const isTypeHTMLElement = (element: unknown): element is HTMLElement =>
  element instanceof HTMLElement;

export const isTypeSVGElement = (element: unknown): element is HTMLElement =>
  element instanceof SVGElement;
