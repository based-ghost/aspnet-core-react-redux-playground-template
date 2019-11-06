import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IApplicationState } from '../store';
import { RoutesConfig } from '../config/routes.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BulmaLogo = require('../assets/image/bulma.io-logo.png') as string;

type NavBarProps = {
  readonly isAuthenticated: boolean;
};

const NavBar: React.FC<NavBarProps> = ({ isAuthenticated }) => {
  const navRouteKeys = Object
    .keys(RoutesConfig)
    .filter((key: string) => !!RoutesConfig[key].showInNav);

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
        {isAuthenticated && navRouteKeys.map((key: string) => (
          <NavLink
            className='navbar-item'
            activeClassName='is-active'
            to={RoutesConfig[key].path}
            key={RoutesConfig[key].path}
            exact={RoutesConfig[key].exact}
          >
            <FontAwesomeIcon icon={RoutesConfig[key].icon} />
            {RoutesConfig[key].displayName}
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

export default connect(mapStateToProps)(NavBar);
