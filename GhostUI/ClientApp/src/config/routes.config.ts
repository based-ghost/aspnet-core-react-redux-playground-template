import { IconProp } from '@fortawesome/fontawesome-svg-core';

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
