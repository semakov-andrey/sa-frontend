import { useEffect, useState } from 'react';

export const useLocation = (): string => {
  const [ location, setLocation ] = useState(window.location.pathname);

  useEffect(() => {
    const handler = (): void => {
      setLocation(window.location.pathname);
    };

    window.addEventListener('popstate', handler);

    return (): void => {
      window.removeEventListener('popstate', handler);
    };
  }, []);

  return location;
};
