import React, { useEffect } from 'react';
import { CallbackFunction } from '../../types';
import { AuthStatusEnum } from '../../store/auth/types';

type AuthenticatorProps = {
  readonly authStatus?: string;
  readonly callbackTimeout?: number;
  readonly handleOnFail: CallbackFunction;
  readonly handleOnSuccess: CallbackFunction;
};

const Authenticator: React.FC<AuthenticatorProps> = ({
  authStatus,
  handleOnFail,
  handleOnSuccess,
  callbackTimeout = 1500,
}) => {
  useEffect(() => {
    const handleAuthCallback = (authStatus: string): void => {
      setTimeout(() => {
        if (authStatus === AuthStatusEnum.Success) {
          handleOnSuccess();
        } else {
          handleOnFail();
        }
      }, callbackTimeout);
    };

    if (authStatus && authStatus.isIn(AuthStatusEnum.Success, AuthStatusEnum.Fail)) {
      handleAuthCallback(authStatus);
    }
  }, [authStatus, callbackTimeout, handleOnFail, handleOnSuccess]);

  if (!authStatus || (authStatus === AuthStatusEnum.None)) {
    return null;
  }

  return (
    <div className={`fingerprint-spinner ${authStatus}`}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Authenticator;