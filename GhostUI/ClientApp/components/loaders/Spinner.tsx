import React from 'react';
import styled, { keyframes } from 'styled-components';

type SpinnerProps = {
  readonly loading?: boolean;
};

type StyledSpinnerProps = {
  readonly $loading?: boolean;
};

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  } 100% {
    transform: rotate(360deg);
  }
`;

const borderColor = '#209cee transparent transparent transparent';

const StyledSpinner = styled.div<StyledSpinnerProps>`
  top: 50%;
  left: 48%;
  z-index: 9999;
  width: 4.75em;
  height: 4.75em;
  position: absolute;
  display: ${({ $loading }) => $loading ? 'inline-block' : 'none'};

  > div {
    width: 4.75em;
    height: 4.75em;
    position: absolute;
    border-radius: 50%;
    border: 0.35em solid;
    box-sizing: border-box;
    border-color: ${borderColor};
    animation: ${rotateAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

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

const Spinner = React.memo<SpinnerProps>(({ loading }) => (
  <StyledSpinner $loading={loading}>
    <div />
    <div />
    <div />
    <div />
  </StyledSpinner>
));

export default Spinner;