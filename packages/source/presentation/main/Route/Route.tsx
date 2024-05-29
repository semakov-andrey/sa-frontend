import { useRoute } from '../Router/Router.hooks/useRoute.hook';

export interface RouteProps {
  path: string;
  element: JSX.Element | null;
}

export const Route = (props: RouteProps): JSX.Element | null => {
  const { path } = props;
  const route = useRoute();

  return path === route ? props.element : null;
};
