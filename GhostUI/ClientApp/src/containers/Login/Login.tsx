import React, { useEffect, useCallback, useState, useRef } from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { SignalRApi } from '../../api';
import { renderToastifyMsg } from '../../utils';
import { IApplicationState } from '../../store';
import { Authenticator } from '../../components';
import { useToggle, useTextInput } from '../../hooks';
import { RoutesConfig } from '../../config/routes.config';
import { actionCreators, AuthStatusEnum, reducer } from '../../store/auth';
import { UserNameInput, PasswordInput, LoginControls } from './child-components';

const BasedGhostLogo = require('../../assets/image/based-ghost-main.png') as string;
type LoginProps = ReturnType<typeof reducer> & typeof actionCreators & { readonly history: History };

const Login: React.FC<LoginProps> = ({
  status,
  history,
  resetState,
  setAuthStatus,
  loginUserRequest
}) => {
  const toastIdRef = useRef<string | number>('');
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false);

  const userNameInput = useTextInput('');
  const passwordInput = useTextInput('', showPassword ? 'text' : 'password');

  useEffect(() => {
    SignalRApi.startConnection();
  }, []);

  const onFailedAuth = useCallback((): void => {
    resetState();
    setAuthStatus(AuthStatusEnum.NONE);
  }, [resetState, setAuthStatus]);

  const onRememberMeCheck = useCallback((checked: boolean): void => setRememberMe(checked), []);
  const onSuccessfulAuth = useCallback((): void => history.push(RoutesConfig.Dashboard.path), [history]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (status === AuthStatusEnum.PROCESS) {
      return;
    }

    if (!userNameInput.hasValue || !passwordInput.hasValue) {
      // Run invalidInputs error and display toast notification (if one is not already active)
      setIsInputInvalid(true);
      if (!toast.isActive(toastIdRef.current)) {
        toastIdRef.current = toast.error(
          renderToastifyMsg('Enter user name/password',
          'exclamation-triangle')
        );
      }
    } else {
      // Clear any toast notifications and prepare state for Login request stub / run login request stub
      toast.dismiss();
      setIsInputInvalid(false);
      setAuthStatus(AuthStatusEnum.PROCESS);

      setTimeout(() => {
        loginUserRequest({
          rememberMe,
          userName: userNameInput.value,
          password: passwordInput.value
        });
      }, 2250);
    }
  };

  return (
    <section className='section section-login'>
      <div className='container has-text-centered'>
        <div className='column is-4 is-offset-4'>
          <h3 className='title'>Login</h3>
          <p className='subtitle'>Please login to proceed</p>
          <div className='box login-box'>
            <img
              width='175'
              id='login-img'
              src={BasedGhostLogo}
              alt='based-ghost-logo'
            />
            <form onSubmit={handleLogin}>
              <UserNameInput
                textInput={userNameInput}
                isInputInvalid={isInputInvalid}
              />
              <PasswordInput
                textInput={passwordInput}
                showPassword={showPassword}
                isInputInvalid={isInputInvalid}
                toggleShowPassword={toggleShowPassword}
              />
              <LoginControls
                rememberMe={rememberMe}
                handleRememberMeCheck={onRememberMeCheck}
              />
            </form>
            <Authenticator
              authStatus={status}
              handleOnFail={onFailedAuth}
              handleOnSuccess={onSuccessfulAuth}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state: IApplicationState) => ({
  status: state.auth.status
});

export default connect(mapStateToProps, actionCreators)(Login);
