import React, { useCallback, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { Route } from 'react-router-dom';
import { useOnClickOutside } from '../hooks';
import { IApplicationState } from '../store';
import { actionCreators } from '../store/auth';
import { nugetUrlConfig } from '../config/constants';
import { RoutesConfig } from '../config/routes.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type SettingsProps = typeof actionCreators
  & { readonly isAuthenticated: boolean };

type SettingsMenuProps = {
  readonly handleLogout: (history: History<any>) => () => void;
};

const SettingsMenu: React.FC<SettingsMenuProps> = ({ handleLogout }) => (
  <ul className='dropdown-menu'>
    <li className='header-title'>Settings</li>
    <li>
      <a
        role='button'
        rel='noopener'
        target='_blank'
        className='dropdown-item'
        href={nugetUrlConfig.HEALTH_UI}
      >
        <FontAwesomeIcon icon='heart' /> Health Checks
        </a>
    </li>
    <li>
      <a
        role='button'
        rel='noopener'
        target='_blank'
        className='dropdown-item'
        href={nugetUrlConfig.SWAGGER_DOCS}
      >
        <FontAwesomeIcon icon='file' /> Swagger API
        </a>
    </li>
    <li>
      <Route
        render={({ history }) => (
          <a
            role='button'
            className='dropdown-item'
            onClick={handleLogout(history)}
          >
            <FontAwesomeIcon icon={RoutesConfig.Login.icon} />{' '}
            {RoutesConfig.Login.displayName}
          </a>
        )}
      />
    </li>
  </ul>
);

const Settings: React.FC<SettingsProps> = ({ isAuthenticated, logoutUserRequest }) => {
  const [isMenuOpen, setisMenuOpen] = useState<boolean>(false);
  const settingsAnchorRef = useRef<HTMLAnchorElement | null>(null);

  const onOutsideClick = useCallback(() => {
    setisMenuOpen(false);
  }, []);

  const onInsideClick = useCallback(() => {
    setisMenuOpen(prevIsMenuOpen => !prevIsMenuOpen);
  }, []);

  useOnClickOutside(
    settingsAnchorRef,
    onOutsideClick,
    onInsideClick
  );

  const handleLogout = (history: History<any>) => (): void => {
    const onLogoutCallbackFn = (() => history.push(RoutesConfig.Login.path));
    logoutUserRequest(onLogoutCallbackFn);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={(`fixed-plugin ${isMenuOpen ? 'fixed-plugin-active' : ''}`).trim()}>
      <div className='dropdown'>
        <a role='button' ref={settingsAnchorRef}>
          <FontAwesomeIcon icon='cog' size='3x' />
        </a>
        {isMenuOpen && <SettingsMenu handleLogout={handleLogout} />}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IApplicationState) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, actionCreators)(Settings);
