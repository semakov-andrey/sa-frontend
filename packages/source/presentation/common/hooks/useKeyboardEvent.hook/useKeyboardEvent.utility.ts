export const getAdditionalCondition = (keys: string[], event: KeyboardEvent): boolean => {
  if (keys.length === 1) {
    return !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
  }

  switch (keys[0]) {
    case 'CMD':
    case 'WINDOWS':
      return event.metaKey;
    case 'CTRL':
      return event.ctrlKey;
    case 'SHIFT':
      return event.shiftKey;
    case 'OPTION':
    case 'ALT':
      return event.altKey;
    default:
      return false;
  }
};
