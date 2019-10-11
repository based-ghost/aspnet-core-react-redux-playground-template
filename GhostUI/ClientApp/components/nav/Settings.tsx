import React, { useCallback, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { Route } from 'react-router-dom';
import { IApplicationState } from '../../store';
import { actionCreators } from '../../store/auth';
import { spaNugetUrls } from '../../config/constants';
import { RoutesConfig } from '../../config/routes.config';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

type SettingsProps = { readonly isAuthenticated: boolean; } & typeof actionCreators;

const Settings: React.FC<SettingsProps> = ({ isAuthenticated, logoutUserRequest }) => {
  const [open, setOpen] = useState<boolean>(false);
  const settingsAnchorRef = useRef<HTMLAnchorElement | null>(null);

  const onOutsideClick = useCallback(() => {
    setOpen(false);
  }, []);

  const onInsideClick = useCallback(() => {
    setOpen(open => !open);
  }, []);

  useOnClickOutside(
    settingsAnchorRef,
    onOutsideClick,
    onInsideClick
  );

  const handleLogout = (history: History) => (e: React.MouseEvent): void => {
    const onLogoutCallbackFn = ((): void => history.push(RoutesConfig.Login.path));
    logoutUserRequest(onLogoutCallbackFn);
  };

  const logoutRoute: React.ReactNode = (
    <Route
      render={({ history }) => (
        <a
          className='dropdown-item'
          onClick={handleLogout(history)}
          role='button'
        >
          <FontAwesomeIcon icon={RoutesConfig.Login.icon as IconProp} />{' '}
          {RoutesConfig.Login.displayName}
        </a>
      )}
    />
  );

  const menuContent: React.ReactNode = open && (
    <ul className='dropdown-menu'>
      <li className='header-title'>Settings</li>
      <li>
        <a
          className='dropdown-item'
          target='_blank'
          rel='noopener'
          href={spaNugetUrls.HEALTH_UI}
          role='button'
        >
          <FontAwesomeIcon icon='heart' /> Health Checks
        </a>
      </li>
      <li>
        <a
          className='dropdown-item'
          target='_blank'
          rel='noopener'
          href={spaNugetUrls.SWAGGER_DOCS}
          role='button'
        >
          <FontAwesomeIcon icon='file' /> Swagger API
        </a>
      </li>
      <li>{logoutRoute}</li>
    </ul>
  );

  return (
    <div
      style={{ display: !isAuthenticated ? 'none' : '' }}
      className={(`fixed-plugin ${open ? 'fixed-plugin-active' : ''}`).trim()}
    >
      <div className='dropdown'>
        <a role='button' ref={settingsAnchorRef}>
          <FontAwesomeIcon icon='cog' size='3x' />
        </a>
        {menuContent}
      </div>
    </div>
  );
};

// Map only necessary IApplicationState to Settings props
const mapStateToProps = (state: IApplicationState) => ({
  isAuthenticated: state.auth.isAuthenticated
});

// Wire up the React component to the Redux store
export default connect(mapStateToProps, actionCreators)(Settings);
