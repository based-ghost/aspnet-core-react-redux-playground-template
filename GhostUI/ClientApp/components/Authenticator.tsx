import React, { useEffect } from 'react';
import { CallbackFunction } from '../types';
import styled, { keyframes } from 'styled-components';
import { AuthStatusEnum, AuthStatus } from '../store/auth/types';

type AuthenticatorWrapperProps = {
  readonly authStatus?: AuthStatus;
};

type AuthenticatorProps = {
  readonly delay?: number;
  readonly authStatus?: AuthStatus;
  readonly handleOnFail: CallbackFunction;
  readonly handleOnSuccess: CallbackFunction;
};

const _childDivCount = 9;
const _failColor = '#e74c3c';
const _blueColor = '#3273dc';
const _successColor = '#16E04C';

const _fingerprintAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const childDivTemplate = (childIndex: number): string => (`
  &:nth-child(${childIndex + 1}) {
    height: calc(96px / 9 + ${childIndex} * 96px / 9);
    width: calc(96px / 9 + ${childIndex} * 96px / 9);
    animation-delay: calc(50ms * ${childIndex + 1});
  }
`);

const getChildDivCSS = (): string => {
  let childDivCSS = '';
  for (let index = 0; index < _childDivCount; index += 1) {
    childDivCSS += childDivTemplate(index);
  }
  return childDivCSS;
};

const getChildDivBorderColor = (authStatus: AuthStatus): string => {
  if (authStatus === AuthStatusEnum.SUCCESS) return _successColor;
  if (authStatus === AuthStatusEnum.FAIL) return _failColor;
  return _blueColor;
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
    animation: ${_fingerprintAnimation} 1500ms cubic-bezier(0.68, -0.75, 0.265, 1.75) infinite forwards;

    ${getChildDivCSS()}
  }
`;

const Authenticator = React.memo<AuthenticatorProps>(({
  authStatus,
  handleOnFail,
  handleOnSuccess,
  delay = 1500,
}) => {
  useEffect(() => {
    const authHandler = setTimeout(() => {
      (authStatus === AuthStatusEnum.FAIL) && handleOnFail();
      (authStatus === AuthStatusEnum.SUCCESS) && handleOnSuccess();
    }, delay);

    return () => {
      clearTimeout(authHandler);
    };
  }, [authStatus, delay, handleOnFail, handleOnSuccess]);

  if (!authStatus || (authStatus === AuthStatusEnum.NONE)) {
    return null;
  }

  return (
    <AuthenticatorWrapper authStatus={authStatus}>
      <div /><div /><div />
      <div /><div /><div />
      <div /><div /><div />
    </AuthenticatorWrapper>
  );
});

export default Authenticator;