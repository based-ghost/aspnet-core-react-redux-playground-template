import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type Route = {
  readonly path: string;
  readonly icon?: IconProp;
  readonly exact?: boolean;
  readonly displayName: string;
  readonly showInNav?: boolean;
  readonly pathAbsolute?: string;
};

export const RoutesConfig = Object.freeze<Record<string, Route>>({
  Login: {
    path: '/',
    showInNav: false,
    icon: 'sign-out-alt',
    displayName: 'Logout',
  },
  Form: {
    exact: true,
    path: '/form',
    showInNav: true,
    displayName: 'Form',
  },
  Dashboard: {
    exact: true,
    showInNav: true,
    path: '/dashboard',
    displayName: 'Home',
  },
  FetchData: {
    showInNav: true,
    path: '/fetchdata',
    displayName: 'Fetch',
    pathAbsolute: '/fetchdata/:startDateIndex?',
  },
});
