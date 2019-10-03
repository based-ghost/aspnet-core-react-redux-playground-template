import React, { useEffect } from 'react';
import { AuthStatusEnum } from '../../store/auth/types';

type AuthenticatorProps = {
  authStatus?: string;
  callbackTimeout?: number;
  successDispatcher: () => void;
  failDispatcher: () => void;
};

const Authenticator: React.FC<AuthenticatorProps> = ({
  authStatus,
  failDispatcher,
  successDispatcher,
  callbackTimeout = 1500,
}) => {
  useEffect(() => {
    const handleAuthCallback = (authStatus: string): void => {
      setTimeout(() => {
        if (authStatus === AuthStatusEnum.Success) {
          successDispatcher();
        } else {
          failDispatcher();
        }
      }, callbackTimeout);
    };

    if (authStatus && authStatus.isIn(AuthStatusEnum.Success, AuthStatusEnum.Fail)) {
      handleAuthCallback(authStatus);
    }
  }, [authStatus, callbackTimeout, failDispatcher, successDispatcher]);

  return (
    <div className={`atom-loader ${authStatus}`}>
      <div />
      <div />
    </div>
  );
};

export default Authenticator;