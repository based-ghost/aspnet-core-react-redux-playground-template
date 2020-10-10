import React, { useEffect } from 'react';
import { CallbackFunction } from '../types';
import { AuthStatusEnum } from '../store/auth/types';
import styled, { keyframes } from 'styled-components';

type AuthenticatorWrapperProps = {
  readonly authStatus?: AuthStatusEnum;
};

type AuthenticatorProps = {
  readonly delay?: number;
  readonly authStatus?: AuthStatusEnum;
  readonly handleOnFail: CallbackFunction;
  readonly handleOnSuccess: CallbackFunction;
};

const _childDivCount = 9;

const _authAnimationKeyframes = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const getChildDivBorderColor = (authStatus: AuthStatusEnum): string => {
  switch (authStatus) {
    case AuthStatusEnum.FAIL: return '#e93e60';
    case AuthStatusEnum.SUCCESS: return '#09d3ac';
    default: return 'rgba(9, 30, 66, 0.35)';
  }
};

const getChildDivCSS = (): string => {
  const childDivTemplate = (childIndex: number): string => `
    &:nth-child(${childIndex + 1}) {
      height: calc(96px / 9 + ${childIndex} * 96px / 9);
      width: calc(96px / 9 + ${childIndex} * 96px / 9);
      animation-delay: calc(50ms * ${childIndex + 1});
    }
  `;

  return [...Array(_childDivCount).keys()]
    .map((key) => childDivTemplate(key))
    .join('');
};

const AuthenticatorWrapper = styled.div<AuthenticatorWrapperProps>`
  width: 100px;
  height: 100px;
  padding: 2px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  margin: 1.25em auto auto auto;

  > div {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    border-radius: 50%;
    box-sizing: border-box;
    border: 2px solid transparent;
    border-top-color: ${({ authStatus }) => getChildDivBorderColor(authStatus)};
    animation: ${_authAnimationKeyframes} 1500ms cubic-bezier(0.68, -0.75, 0.265, 1.75) infinite forwards;

    ${getChildDivCSS()}
  }
`;

const Authenticator = React.memo<AuthenticatorProps>(
  ({ authStatus, handleOnFail, handleOnSuccess, delay = 1500 }) => {
    useEffect(() => {
      const authHandler = setTimeout(() => {
        switch (authStatus) {
          case AuthStatusEnum.FAIL:
            handleOnFail();
            return;
          case AuthStatusEnum.SUCCESS:
            handleOnSuccess();
            return;
          default:
            return;
        }
      }, delay);

      return () => {
        clearTimeout(authHandler);
      };
    }, [authStatus, delay, handleOnFail, handleOnSuccess]);

    if (!authStatus || authStatus === AuthStatusEnum.NONE) {
      return null;
    }

    return (
      <AuthenticatorWrapper authStatus={authStatus}>
        <div /><div /><div />
        <div /><div /><div />
        <div /><div /><div />
      </AuthenticatorWrapper>
    );
  }
);

Authenticator.displayName = 'Authenticator';

export default Authenticator;