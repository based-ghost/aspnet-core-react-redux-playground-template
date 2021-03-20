import type { IconProp } from '@fortawesome/fontawesome-svg-core';

export type Route = Readonly<{
  path: string;
  icon?: IconProp;
  exact?: boolean;
  displayName: string;
  showInNav?: boolean;
  pathAbsolute?: string;
}>;

export const RoutesConfig = Object.freeze<Record<string, Route>>({
  Login: {
    path: '/',
    exact: true,
    icon: 'sign-out-alt',
    displayName: 'Logout',
  },
  Form: {
    path: '/form',
    showInNav: true,
    displayName: 'Form',
  },
  Dashboard: {
    showInNav: true,
    path: '/dashboard',
    displayName: 'Home',
  },
  FetchData: {
    showInNav: true,
    displayName: 'Fetch',
    path: '/fetchdata',
    pathAbsolute: '/fetchdata/:startDateIndex?',
  },
});
