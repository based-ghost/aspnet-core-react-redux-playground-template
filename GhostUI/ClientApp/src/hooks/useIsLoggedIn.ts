import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import type { RootState } from '../store';

const useIsLoggedIn = (): boolean => {
  const { pathname } = useLocation();
  const isAuthenticated = useSelector<RootState, boolean>(state => state.auth.isAuthenticated);

  return isAuthenticated && (pathname !== '/');
};

export default useIsLoggedIn;
