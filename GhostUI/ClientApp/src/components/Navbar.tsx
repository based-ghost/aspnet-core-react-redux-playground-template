import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IApplicationState } from '../store';
import { ReactComponent as BulmaLogoSvg } from '../assets/image/BulmaLogo.svg';
import { RoutesConfig, Route } from '../config/routes.config';

type NavbarProps = Readonly<{
  isAuthenticated: boolean;
}>;

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  const navRoutes: Route[] = Object.keys(RoutesConfig).reduce((acc, key) => {
    const route = RoutesConfig[key];
    route.showInNav && acc.push(route);
    return acc;
  }, [] as Route[]);

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

const mapStateToProps = (state: IApplicationState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Navbar);
