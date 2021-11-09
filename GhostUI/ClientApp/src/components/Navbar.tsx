import { useIsLoggedIn } from '../hooks';
import { Routes as routes } from '../config';
import { NavLink, generatePath } from 'react-router-dom';
import { ReactComponent as BulmaLogoSVG } from '../assets/image/BulmaLogo.svg';

import type { Route } from '../config';
import type { FunctionComponent } from 'react';

const Navbar: FunctionComponent = () => {
  const isLoggedIn = useIsLoggedIn();

  const navRoutes = routes.reduce((acc: Route[], r: Route) => {
    r.showInNav && acc.push(r);
    return acc;
  }, []);

  return (
    <nav
      role='navigation'
      className='navbar'
      aria-label='main navigation'
    >
      <div className='navbar-wrapper'>
        <div className='brand-wrapper'>
          <BulmaLogoSVG
            width='130'
            height='65'
            aria-hidden={true}
            title='bulma.io-logo'
          />
        </div>
        <div className='navbar-routes'>
          {isLoggedIn &&
            navRoutes.map(({ path, name, params }) => (
              <NavLink
                key={name}
                to={generatePath(path, params)}
                className={({ isActive }) => 'navbar-item' + (isActive ? ' is-active' : '')}
              >
                {name}
              </NavLink>
            ))}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
