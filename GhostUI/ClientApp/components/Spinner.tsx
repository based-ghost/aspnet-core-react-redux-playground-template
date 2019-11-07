import React from 'react';
import styled, { keyframes } from 'styled-components';

type SpinnerProps = {
  readonly isLoading?: boolean;
};

const _spinRingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  } 100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div<SpinnerProps>`
  top: 50%;
  left: 48%;
  z-index: 9999;
  width: 4.75em;
  height: 4.75em;
  position: absolute;
  display: ${({ isLoading }) => isLoading ? 'inline-block' : 'none'};

  > div {
    width: 4.75em;
    height: 4.75em;
    position: absolute;
    border-radius: 50%;
    border: 0.35em solid;
    box-sizing: border-box;
    border-color: #209cee transparent transparent transparent;
    animation: ${_spinRingAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

    :nth-child(1) {
       animation-delay: -0.45s;
    }

    :nth-child(2) {
      animation-delay: -0.3s;
    }

    :nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`;

const Spinner = React.memo<SpinnerProps>(({ isLoading }) => (
  <StyledSpinner isLoading={isLoading}>
    <div />
    <div />
    <div />
    <div />
  </StyledSpinner>
));

Spinner.displayName = 'Spinner';

export default Spinner;