import { useLocation } from 'react-router';
import { useAppSelector } from '../store';

const useIsLoggedIn = (): boolean => {
  const { pathname } = useLocation();
  const isAuthenticated = useAppSelector<boolean>((state) => state.auth.isAuthenticated);

  return isAuthenticated && (pathname !== '/');
};

export default useIsLoggedIn;
