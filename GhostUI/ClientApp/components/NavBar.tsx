import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IApplicationState } from '../store';
import { RoutesConfig } from '../config/routes.config';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BulmaLogo = require('../assets/image/bulma.io-logo.png') as string;

type NavBarProps = {
  readonly isAuthenticated: boolean;
};

const NavBar: React.FC<NavBarProps> = ({ isAuthenticated }) => {
  const navRoutes: React.ReactNode = isAuthenticated && (
    <Fragment>
      <NavLink
        exact
        to={RoutesConfig.Form.path}
        className='navbar-item'
        activeClassName='is-active'
      >
        <FontAwesomeIcon icon={RoutesConfig.Form.icon as IconProp} />
        {RoutesConfig.Form.displayName}
      </NavLink>
      <NavLink
        exact
        to={RoutesConfig.Dashboard.path}
        className='navbar-item'
        activeClassName='is-active'
      >
        <FontAwesomeIcon icon={RoutesConfig.Dashboard.icon as IconProp} />
        {RoutesConfig.Dashboard.displayName}
      </NavLink>
      <NavLink
        to={RoutesConfig.FetchData.path}
        className='navbar-item'
        activeClassName='is-active'
      >
        <FontAwesomeIcon icon={RoutesConfig.FetchData.icon as IconProp} />
        {RoutesConfig.FetchData.displayName}
      </NavLink>
    </Fragment>
  );

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
        <div className='navbar-routes'>{navRoutes}</div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state: IApplicationState) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(NavBar);
