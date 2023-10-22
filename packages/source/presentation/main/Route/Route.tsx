import React, { Suspense } from 'react';

export type RouteProps = NormalRoutePropsWithRender | NormalRoutePropsWithElement | LazyRouteProps;

export interface NormalRoutePropsWithRender {
  path: string;
  render: () => JSX.Element | null;
}

export interface NormalRoutePropsWithElement {
  path: string;
  element: JSX.Element | null;
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

  if ('element' in props) {
    return props.element;
  }

  return props.render();
};
