import { useCallback, useState, useRef, type FormEvent, type FunctionComponent } from 'react';
import { Routes } from '../../config';
import { useTextInput } from '../../hooks';
import LoginControls from './LoginControls';
import UserNameInput from './UserNameInput';
import PasswordInput from './PasswordInput';
import { useNavigate } from 'react-router-dom';
import { toast, type Id } from 'react-toastify';
import { Authenticator } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store';
import BasedGhostLogoPNG from '../../assets/image/based-ghost-main.png';
import { loginAsync, setAuthStatus, resetState, AuthStatusEnum, type Credentials } from '../../store/authSlice';

const Login: FunctionComponent = () => {
  const toastIdRef = useRef<Id>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false);

  const userNameInput = useTextInput('');
  const passwordInput = useTextInput('', showPassword ? 'text' : 'password');

  // react-redux hooks state/actions
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector<AuthStatusEnum>((state) => state.auth.status);

  const dispatchAuthStatus = useCallback((status: AuthStatusEnum): void => {
    dispatch(setAuthStatus(status));
  }, [dispatch]);

  const onFailedAuth = useCallback((): void => {
    dispatchAuthStatus(AuthStatusEnum.NONE);
    dispatch(resetState());
  }, [dispatch, dispatchAuthStatus]);

  const onSuccessfulAuth = useCallback((): void => {
    const homePath = Routes.find((x) => x.name === 'Home')?.path ?? '/';
    navigate(homePath);
  }, [navigate]);

  const onRememberMeCheck = useCallback((checked: boolean): void => setRememberMe(checked), []);
  const onToggleShowPassword = useCallback((): void => setShowPassword((prevShow: boolean) => !prevShow), []);

  const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (status === AuthStatusEnum.PROCESS) {
      return;
    }

    if (!userNameInput.hasValue || !passwordInput.hasValue) {
      // Run invalidInputs error and display toast notification (if one is not already active)
      setIsInputInvalid(true);
      if (!toast.isActive(toastIdRef.current)) {
        toastIdRef.current = toast.error('Enter user name/password');
      }
    } else {
      // Clear any toast notifications and prepare state for Login request stub / run login request stub
      toast.dismiss();
      setIsInputInvalid(false);
      dispatchAuthStatus(AuthStatusEnum.PROCESS);

      setTimeout(() => {
        const credentials: Credentials = {
          rememberMe,
          userName: userNameInput.value,
          password: passwordInput.value,
        };

        dispatch(loginAsync(credentials));
      }, 2000);
    }
  };

  return (
    <section className="section section-login">
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title">Login</h3>
          <p className="subtitle">Please login to proceed</p>
          <div className="box login-box">
            <img
              width="170"
              aria-hidden
              id="login-img"
              alt="based-ghost-logo"
              src={BasedGhostLogoPNG}
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
                toggleShowPassword={onToggleShowPassword}
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

export default Login;
