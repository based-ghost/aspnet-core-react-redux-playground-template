import type { ComponentType } from 'react';
import type { Params, Location } from 'react-router-dom';
import { Login, Dashboard, FetchData, Form } from '../containers';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

export const TRANSITION_DEFAULT = {
  classNames: 'fade',
  timeout: { enter: 250, exit: 250 }
};

export type RouteComponent = ComponentType<any>;
export type Transition = typeof TRANSITION_DEFAULT;
export type TransitionMetaData = Transition & { key: string };

export type Route = Readonly<{
  name: string;
  path: string;
  icon?: IconProp;
  showInNav?: boolean;
  transition: Transition;
  Component: RouteComponent;
  params?: Readonly<Params<string>>;
}>;

export const Routes: Route[] = [
  {
    path: '/',
    icon: 'sign-out-alt',
    name: 'Logout',
    Component: Login,
    transition: TRANSITION_DEFAULT
  },
  {
    path: '/form',
    showInNav: true,
    name: 'Form',
    Component: Form,
    transition: {
      classNames: 'page-slide-left',
      timeout: { enter: 350, exit: 250 }
    }
  },
  {
    showInNav: true,
    path: '/home',
    name: 'Home',
    Component: Dashboard,
    transition: TRANSITION_DEFAULT
  },
  {
    showInNav: true,
    name: 'Fetch',
    path: '/fetch/:startDateIndex',
    Component: FetchData,
    transition: {
      classNames: 'page-slide-right',
      timeout: { enter: 350, exit: 250 }
    },
    params: {
      startDateIndex: '0'
    }
  }
];

// Can't use Location.key for CSSTransition key. Path for 'Fetch' route changes
// ...on pagination and generates a new key (triggering a transition event).
export const getTransitionMetaData = ({
  pathname,
}: Location): TransitionMetaData => {
  const key = pathname.split('/', 2).join('/');
  const route = Routes.find((r) => r.path.startsWith(key));
  const transition = route?.transition ?? TRANSITION_DEFAULT;
  return { key, ...transition };
};