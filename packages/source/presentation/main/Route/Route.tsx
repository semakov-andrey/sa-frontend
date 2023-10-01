import React, { Suspense } from 'react';

export type RouteProps = NormalRouteProps | LazyRouteProps;

export interface NormalRouteProps {
  path: string;
  render: () => JSX.Element | null;
}

export interface LazyRouteProps {
  path: string;
  lazy: boolean;
  component: React.FunctionComponent;
}

export const Route = (props: RouteProps): JSX.Element | null => {
  if ('lazy' in props) {
    return (
      <Suspense fallback={ null }>
        <props.component />
      </Suspense>
    );
  }

  return props.render();
};
