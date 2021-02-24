import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../store';
import { RoutesConfig, Route } from '../config/routes.config';
import { ReactComponent as BulmaLogoSvg } from '../assets/image/BulmaLogo.svg';

const Navbar: FunctionComponent = () => {
  const navRoutes: Route[] = Object.values(RoutesConfig).filter((x) => x.showInNav);
  const isAuthenticated = useSelector<RootState, boolean>(state => state.auth.isAuthenticated);

  return (
    <nav role='navigation' className='navbar' aria-label='main navigation'>
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
