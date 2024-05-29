import React from 'react';

export interface RouterContextValues {
  location: string;
  locations: string[];
  matching: ObjectDefType<string, string>;
  route: string;
}

export const RouterContext = React.createContext<RouterContextValues>({
  location: window.location.pathname,
  locations: [ window.location.pathname ],
  matching: {},
  route: ''
});
