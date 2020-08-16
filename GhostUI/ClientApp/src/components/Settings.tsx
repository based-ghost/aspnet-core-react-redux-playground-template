import React, { useRef, AnchorHTMLAttributes } from 'react';
import { History } from 'history';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { FontAwesomeIconMemo } from '.';
import { IApplicationState } from '../store';
import { actionCreators } from '../store/auth';
import { NUGET_URL_CONFIG } from '../config/constants';
import styled, { keyframes } from 'styled-components';
import { RoutesConfig } from '../config/routes.config';
import { useOnClickOutside, useCallbackState } from '../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type MenuLinkAttributes = AnchorHTMLAttributes<HTMLAnchorElement>;
type SettingsProps = typeof actionCreators & { isAuthenticated: boolean };

const FADE_IN_KEYFRAMES = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

const LINK_ATTRIBUTES: MenuLinkAttributes = {
  role: 'button',
  target: '_blank',
  rel: 'noopener noreferrer',
};

const SettingsLink = styled.a`
  border: 0;
  outline: 0;
  cursor: pointer;
  padding: 0.25rem;
  background: transparent;
`;

const SettingsMenuLink = styled.a`
  width: 100%;
  color: #555;
  font-size: 1rem;
  z-index: initial;
  text-align: left;
  line-height: 1.5;
  position: relative;
  white-space: nowrap;
  display: inline-block;
  padding: 0.375rem 1rem;
  pointer-events: visible;

  svg {
    opacity: 0.8;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
  }
`;

const CogIcon = styled(FontAwesomeIcon)`
  color: #fff;
  padding: 10px;
`;

const SettingsMenuTitle = styled.li`
  width: 73%;
  color: #7f888f;
  font-size: 18px;
  margin-left: auto;
  line-height: 35px;
  margin-right: auto;
  text-align: center;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`;

const SettingsMenu = styled.ul`
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
  border-radius: 3px;
  position: absolute;
  padding-bottom: 5px;
  background-color: #fff;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.08), 0 5px 20px 0 rgba(0, 0, 0, 0.06);

  :before,
  :after {
    top: 22px;
    content: '';
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
      background-color: rgba(0, 0, 0, 0.035);
    }
  }
`;

const StyledSettings = styled.div<{ isMenuOpen: boolean }>`
  right: 0;
  top: 120px;
  width: 65px;
  z-index: 1031;
  position: fixed;
  text-align: center;
  animation-delay: 0.25s;
  border-radius: 8px 0 0 8px;
  transition: background 0.15s ease-in;
  animation: ${FADE_IN_KEYFRAMES} 0.25s both ease;
  background: ${({ isMenuOpen }) => isMenuOpen ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.45)'};

  :hover {
    background: rgba(0, 0, 0, 0.6);
  }
`;

const Settings: React.FC<SettingsProps> = ({
  isAuthenticated,
  logoutUserRequest
}) => {
  const { HEALTH_UI, SWAGGER_DOCS } = NUGET_URL_CONFIG;
  const settingsLinkRef = useRef<HTMLAnchorElement | null>(null);
  const [isMenuOpen, setisMenuOpen] = useCallbackState<boolean>(false);

  useOnClickOutside(settingsLinkRef, setisMenuOpen);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = (history: History<any>) => (): void => {
    const onLogoutCallbackFn = () => history.push(RoutesConfig.Login.path);
    logoutUserRequest(onLogoutCallbackFn);
  };

  return (
    <StyledSettings isMenuOpen={isMenuOpen}>
      <SettingsLink
        role='button'
        ref={settingsLinkRef}
        onClick={() => setisMenuOpen(!isMenuOpen)}
      >
        <CogIcon icon='cog' size='3x' />
      </SettingsLink>
      {isMenuOpen && (
        <SettingsMenu>
          <SettingsMenuTitle>Settings</SettingsMenuTitle>
          <li>
            <SettingsMenuLink href={HEALTH_UI} {...LINK_ATTRIBUTES}>
              <FontAwesomeIconMemo icon='heart' /> Health Checks
            </SettingsMenuLink>
          </li>
          <li>
            <SettingsMenuLink href={SWAGGER_DOCS} {...LINK_ATTRIBUTES}>
              <FontAwesomeIconMemo icon='file' /> Swagger API
            </SettingsMenuLink>
          </li>
          <li>
            <Route
              render={({ history }) => (
                <SettingsMenuLink role='button' onClick={handleLogout(history)}>
                  <FontAwesomeIconMemo icon={RoutesConfig.Login.icon} />
                  {` ${RoutesConfig.Login.displayName}`}
                </SettingsMenuLink>
              )}
            />
          </li>
        </SettingsMenu>
      )}
    </StyledSettings>
  );
};

const mapStateToProps = (state: IApplicationState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, actionCreators)(Settings);
