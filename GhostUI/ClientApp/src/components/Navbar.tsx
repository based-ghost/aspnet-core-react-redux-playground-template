import { RoutesConfig } from '../config';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ReactComponent as BulmaLogoSvg } from '../assets/image/BulmaLogo.svg';

import type { Route } from '../config';
import type { RootState } from '../store';
import type { FunctionComponent } from 'react';

const Navbar: FunctionComponent = () => {
  const navRoutes: Route[] = Object.values(RoutesConfig).filter((x) => x.showInNav);
  const isAuthenticated = useSelector<RootState, boolean>(state => state.auth.isAuthenticated);

  return (
    <nav
      role='navigation'
      className='navbar'
      aria-label='main navigation'
    >
      <div className='navbar-wrapper'>
        <div className='brand-wrapper'>
          <BulmaLogoSvg
            width='135'
            height='66'
            aria-hidden={true}
            title='bulma.io-logo'
          />
        </div>
        <div className='navbar-routes'>
          {isAuthenticated &&
            navRoutes.map(({ path, exact, displayName }) => (
              <NavLink
                to={path}
                key={path}
                exact={exact}
                className='navbar-item'
                activeClassName='is-active'
              >
                {displayName}
              </NavLink>
            ))}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
