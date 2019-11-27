import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IApplicationState } from '../store';
import { RoutesConfig, Route } from '../config/routes.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BulmaLogo = require('../assets/image/bulma.io-logo.png') as string;

type NavbarProps = {
  readonly isAuthenticated: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  const navRoutes: Route[] = Object
    .keys(RoutesConfig)
    .map((key) => RoutesConfig[key])
    .filter((route) => !!route.showInNav);

  return (
    <nav
      role='navigation'
      className='navbar'
      aria-label='main navigation'
    >
      <div className='navbar-wrapper'>
        <div className='brand-wrapper'>
          <img
            width='155'
            src={BulmaLogo}
            alt='bulma.io-logo'
          />
        </div>
        <div className='navbar-routes'>
          {isAuthenticated && navRoutes.map((route: Route): ReactNode => (
            <NavLink
              to={route.path}
              key={route.path}
              exact={route.exact}
              className='navbar-item'
              activeClassName='is-active'
            >
              <FontAwesomeIcon icon={route.icon} />
              {route.displayName}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state: IApplicationState) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Navbar);
