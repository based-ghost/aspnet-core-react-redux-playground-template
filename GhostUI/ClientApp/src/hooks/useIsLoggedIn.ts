import { useAppSelector } from '../store';
import { useLocation } from 'react-router-dom';

const useIsLoggedIn = (): boolean => {
  const { pathname } = useLocation();
  const isAuthenticated = useAppSelector<boolean>((state) => state.auth.isAuthenticated);

  return isAuthenticated && (pathname !== '/');
};

export default useIsLoggedIn;
