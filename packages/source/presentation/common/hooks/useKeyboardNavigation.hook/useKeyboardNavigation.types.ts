export interface UseKeyboardNavigationParams {
  // Amount of child elements that used in navigation
  amount?: number;
  // Key for saving current state to session storage
  storageKey?: string;
  // Open handler, equals click handler by default
  onOpen?: (element: HTMLElement) => void;
  // Click element handler
  onClick?: (element: HTMLElement) => void;
  // Select element handler
  onSelect?: () => void;
  // Keyboard is used right now
  isInputDeviceContext?: boolean;
  // Time to start hiding selected element in interface
  // Always visible by default
  timeToInactive?: number;
  // Scroll selected element into view
  scrollIntoView?: boolean;
  // Initial scroll selected element into view
  initialScrollIntoView?: boolean;
  // Skip this keyboard navigation
  skip?: boolean;
}

export interface UseKeyboardNavigationReturn<T> {
  // Ref for installation to grid of elements
  ref: React.RefObject<T>;
  // Index of selected element
  selected: number;
  // Selected element setter
  setSelected: (selected: number) => void;
  // Set new selected element and don't touch visibility
  setSelectedKeepingVisibility: (selected: number) => void;
  // Selected element visibility state
  isSelectedVisible: boolean;
}
