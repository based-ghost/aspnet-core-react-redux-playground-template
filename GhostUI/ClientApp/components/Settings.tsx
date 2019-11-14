import React, { useCallback, useRef, useState, AnchorHTMLAttributes } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { Route } from 'react-router-dom';
import { useOnClickOutside } from '../hooks';
import { IApplicationState } from '../store';
import { actionCreators } from '../store/auth';
import { nugetUrlConfig } from '../config/constants';
import styled, { keyframes } from 'styled-components';
import { RoutesConfig } from '../config/routes.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type StyledSettingsProps = { readonly isMenuOpen: boolean };
type MenuLinkAttributes = AnchorHTMLAttributes<HTMLAnchorElement>;
type SettingsProps = typeof actionCreators & { readonly isAuthenticated: boolean };

const _fadeIn = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

const _linkAttributes = Object.freeze<MenuLinkAttributes>({
  role: 'button',
  rel: 'noopener',
  target: '_blank',
});

const SettingsMenuLink = styled.a`
  width: 100%;
  color: #555;
  font-size: 1rem;
  z-index: initial;
  text-align: left;
  line-height: 1.5;
  position: relative;
  white-space: nowrap;
  padding-right: 1rem;
  display: inline-block;
  padding: 0.375rem 1rem;
  pointer-events: visible;

  svg {
    margin-left: 0.3rem;
    margin-right: 0.3rem;
  }
`;

const CogIcon = styled(FontAwesomeIcon)`
  width: auto;
  color: #fff;
  padding: 10px;
  border-radius: 0 0 6px 6px;
`;

const SettingsMenuTitle = styled.li`
  width: 75%;
  color: #7f888f;
  font-size: 18px;
  margin-left: auto;
  line-height: 35px;
  margin-right: auto;
  text-align: center;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(0,0,0,.125);
`;

const StyledSettingsMenu = styled.ul`
  top: 0;
  opacity: 1;
  left: auto;
  right: 69px;
  width: 11rem;
  z-index: 1000;
  display: block;
  min-width: 11rem;
  user-select: none;
  padding-top: 10px;
  border-radius: 6px;
  position: absolute;
  padding-bottom: 5px;
  background-color: #fff;
  box-shadow: 0 2px rgba(17, 16, 15, 0.1), 0 2px 10px rgba(17, 16, 15, 0.1);

  :before,
  :after {
    top: 22px;
    content: "";
    width: 17px;
    position: absolute;
    display: inline-block;
    transform: translateY(-50%);
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
  }

  :before {
    left: auto;
    right: -16px;
    margin-left: auto;
    border-left: 16px solid #dbdbdb;
  }

  :after {
    right: -15px;
    border-left: 16px solid #fff;
  }

  > li {
    :hover {
      background-color: rgba(0,0,0,0.035);
    }
  }
`;

const StyledSettings = styled.div<StyledSettingsProps>`
  right: 0;
  top: 120px;
  width: 65px;
  z-index: 1031;
  position: fixed;
  text-align: center;
  animation-delay: 0.25s;
  border-radius: 8px 0 0 8px;
  transition: background 0.15s ease-in;
  animation: ${_fadeIn} 0.25s both ease;
  background: ${({ isMenuOpen }) => isMenuOpen ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.45)'};

  :hover {
    background: rgba(0, 0, 0, 0.6);
  }
`;

const Settings: React.FC<SettingsProps> = ({ isAuthenticated, logoutUserRequest }) => {
  const [isMenuOpen, setisMenuOpen] = useState<boolean>(false);
  const settingsAnchorRef = useRef<HTMLAnchorElement | null>(null);

  const onOutsideClick = useCallback((): void => {
    setisMenuOpen(false);
  }, []);

  const onInsideClick = useCallback((): void => {
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
    <StyledSettings isMenuOpen={isMenuOpen}>
      <a role='button' ref={settingsAnchorRef}>
        <CogIcon icon='cog' size='3x' />
      </a>
      {isMenuOpen && (
        <StyledSettingsMenu>
          <SettingsMenuTitle>Settings</SettingsMenuTitle>
          <li>
            <SettingsMenuLink {..._linkAttributes} href={nugetUrlConfig.HEALTH_UI}>
              <FontAwesomeIcon icon='heart' /> Health Checks
            </SettingsMenuLink>
          </li>
          <li>
            <SettingsMenuLink {..._linkAttributes} href={nugetUrlConfig.SWAGGER_DOCS}>
              <FontAwesomeIcon icon='file' /> Swagger API
            </SettingsMenuLink>
          </li>
          <li>
            <Route
              render={({ history }) => (
                <SettingsMenuLink role='button' onClick={handleLogout(history)}>
                  <FontAwesomeIcon icon={RoutesConfig.Login.icon} />{` ${RoutesConfig.Login.displayName}`}
                </SettingsMenuLink>
              )}
            />
          </li>
        </StyledSettingsMenu>
      )}
    </StyledSettings>
  );
};

const mapStateToProps = (state: IApplicationState) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, actionCreators)(Settings);
