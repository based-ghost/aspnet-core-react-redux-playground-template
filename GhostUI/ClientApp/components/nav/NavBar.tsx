import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IApplicationState } from '../../store';
import { RoutesConfig } from '../../config/routes.config';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  const navRoutes: React.ReactNode = isAuthenticated && (
    <Fragment>
      <NavLink
        exact={true}
        to={RoutesConfig.Form.path}
        className='navbar-item'
        activeClassName='is-active'
      >
        <FontAwesomeIcon icon={RoutesConfig.Form.icon as IconProp} />
        {RoutesConfig.Form.displayName}
      </NavLink>
      <NavLink
        exact={true}
        to={RoutesConfig.Dashboard.path}
        className='navbar-item'
        activeClassName='is-active'
      >
        <FontAwesomeIcon icon={RoutesConfig.Dashboard.icon as IconProp} />
        {RoutesConfig.Dashboard.displayName}
      </NavLink>
      <NavLink
        exact={true}
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
            src={require('../../assets/image/bulma.io-logo.png')}
            alt='bulma.io-logo'
            width='155'
          />
        </div>
        <div className='navbar-routes'>
            {navRoutes}
        </div>
      </div>
    </nav>
  );
};

// Map only necessary IApplicationState to NavBar props
const mapStateToProps = (state: IApplicationState) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

// Wire up the React component to the Redux store
export default connect(mapStateToProps)(NavBar);
