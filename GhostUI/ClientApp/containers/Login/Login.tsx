import React, { useEffect, useCallback, useState, useRef, ReactNode, ChangeEvent, Fragment } from "react";
import { SignalRApi } from "../../api";
import { connect } from "react-redux";
import { renderToastifyMsg } from "../../utils";
import { IApplicationState } from "../../store";
import { toast, ToastId } from "react-toastify";
import { RoutesConfig } from "../../config/routes.config";
import { Checkbox, Authenticator } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { actionCreators, AuthStatusEnum, ICredentials, reducer } from "../../store/auth";

type LoginProps = ReturnType<typeof reducer> & typeof actionCreators;
const BasedGhostLogo = require("../../assets/image/based-ghost-main.png") as string;

const Login: React.FC<LoginProps> = ({
  status,
  history,
  resetState,
  loginUserRequest
}) => {
  const toastIdRef = useRef<ToastId>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false);
  const [authRequestStatus, setAuthRequestStatus] = useState<string>(String(AuthStatusEnum.None));

  const [credentials, setCredentials] = useState<ICredentials>({
    userName: '',
    password: '',
    rememberMe: false
  });

  useEffect(() => {
    SignalRApi.startConnection();
  }, []);

  useEffect(() => {
    setAuthRequestStatus(status);
  }, [status]);

  const userClassName = (`input is-large ${(isInputInvalid && !credentials.userName) ? 'is-danger' : ''}`).trim();
  const pwordClassName = (`input is-large ${(isInputInvalid && !credentials.password) ? 'is-danger' : ''}`).trim();

  const onSuccessfulAuth = useCallback((): void => {
    history.push(RoutesConfig.Dashboard.path);
  }, [history]);

  const onFailedAuth = useCallback((): void => {
    resetState();
    setAuthRequestStatus(String(AuthStatusEnum.None));
  }, [resetState]);

  const onRememberMeCheck = useCallback((checked: boolean): void => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      rememberMe: checked,
    }));
  }, []);

  const onUserNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const userName = e.currentTarget.value || '';
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      userName
    }));
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const password = e.currentTarget.value || '';
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      password: password
    }));
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (authRequestStatus === AuthStatusEnum.Process) {
      return;
    }

    if (!credentials.userName || !credentials.password) {
      // Run invalidInputs error and display toast notification (if one is not already active)
      setIsInputInvalid(true);
      if (!toast.isActive(toastIdRef.current)) {
        const toastErrorJSX = renderToastifyMsg('Enter user name/password', 'exclamation');
        toastIdRef.current = toast.error(toastErrorJSX);
      }
    } else {
      // Clear any toast notifications and prepare state for Login request stub / run login request stub
      toast.dismiss();
      setIsInputInvalid(false);
      setAuthRequestStatus(String(AuthStatusEnum.Process));

      setTimeout(() => {
        loginUserRequest(credentials);
      }, 2500);
    }
  };

  const loginControlsNode: React.ReactNode = (
    <Fragment>
      <div className="field remember-me-field">
        <Checkbox
          label="Remember me"
          onCheck={onRememberMeCheck}
          checked={credentials.rememberMe}
        />
      </div>
      <button type="submit" className="button is-info is-large is-fullwidth">
        <span>Login</span>
        <span className="icon">
          <FontAwesomeIcon icon="sign-in-alt" />
        </span>
      </button>
    </Fragment>
  );

  const nameInputNode: ReactNode = (
    <div className="field">
      <div className="control has-icons-left">
        <input
          autoFocus
          type="text"
          placeholder="Username"
          className={userClassName}
          onChange={onUserNameChange}
          value={credentials.userName}
        />
        <span className="icon is-left">
          <FontAwesomeIcon icon="user" />
        </span>
      </div>
    </div>
  );

  const passwordInputNode: ReactNode = (
    <div className="field">
      <div className="control has-icons-left has-icons-right">
        <input
          placeholder="Password"
          className={pwordClassName}
          onChange={onPasswordChange}
          value={credentials.password}
          type={!showPassword ? 'password' : 'text'}
        />
        <span className="icon is-left">
          <FontAwesomeIcon icon="lock" />
        </span>
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="icon is-right icon-clickable"
          data-tooltip={!showPassword ? 'Show password' : 'Hide password'}
        >
          <FontAwesomeIcon icon={!showPassword ? 'eye' : 'eye-slash'}
          />
        </span>
      </div>
    </div>
  );

  return (
    <section className="section section-login">
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title">Login</h3>
          <p className="subtitle">Please login to proceed</p>
          <div className="box">
            <img
              width="180"
              id="login-img"
              alt="based-ghost-logo"
              src={BasedGhostLogo}
            />
            <form onSubmit={handleLogin}>
              {nameInputNode}
              {passwordInputNode}
              {loginControlsNode}
            </form>
            <Authenticator
              handleOnFail={onFailedAuth}
              handleOnSuccess={onSuccessfulAuth}
              authStatus={authRequestStatus}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Map only necessary IApplicationState to Login props
const mapStateToProps = (state: IApplicationState) => ({
  status: state.auth.status
});

// Wire up the React component to the Redux store
export default connect(mapStateToProps, actionCreators)(Login);
