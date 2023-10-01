import React from 'react';

export interface RouterServicesValues {
  location: string;
  matching: ObjectDefType<string, string>;
}

export const RouterContext = React.createContext<RouterServicesValues>({
  location: window.location.pathname,
  matching: {}
});
