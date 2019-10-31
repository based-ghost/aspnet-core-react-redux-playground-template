import React, { ChangeEventHandler } from 'react';
import styled from 'styled-components';

const _borderColor = '#dbdbdb';
const _checkMarkColor = '#209cee';
const _borderColorHover = '#b5b5b5';

const StyledSpan = styled.span`
  padding-left: 1.5rem;
`;

const StyledLabelWrapper = styled.label`
  display: flex;
  user-select: none;
  position: relative;
`;

const StyledInput = styled.input`
  top: 0.2em;
  z-index: 3;
  opacity: 0;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  position: absolute;

  :checked ~ i {
    :after,
    :before {
      opacity: 1;
      transition: height 0.38s ease;
    }

    :after {
      height: 0.5rem;
    }

    :before {
      height: 1.2rem;
      transition-delay: 0.15s;
    }
  }

  :hover ~ i {
    border-color: ${_borderColorHover};
  }
`;

const StyledCheckIcon = styled.i`
  z-index: 0;
  width: 1rem;
  height: 1rem;
  position: absolute;
  color: ${_borderColor};
  box-sizing: border-box;
  border-radius: 0.0625rem;
  background-color: transparent;
  border: 0.125rem solid currentColor;
  transition: border-color 0.38s ease;
   top: 0.2em;

  :after,
  :before {
    height: 0;
    opacity: 0;
    content: "";
    width: 0.2rem;
    display: block;
    position: absolute;
    border-radius: 0.25rem;
    transform-origin: left top;
    background-color: ${_checkMarkColor};
    transition: opacity 0.38s ease, height 0s linear 0.38s;
  }

  :after {
    left: 0;
    top: 0.3rem;
    transform: rotate(-45deg);
  }

  :before {
    top: 0.65rem;
    left: 0.38rem;
    transform: rotate(-135deg);
  }
`;

type CheckboxProps = {
  readonly id?: string;
  readonly name?: string;
  readonly label?: string;
  readonly checked: boolean;
  readonly disabled?: boolean;
  readonly readOnly?: boolean;
  readonly onCheck: (checked: boolean) => void;
};

const Checkbox = React.memo<CheckboxProps>(({
  id,
  name,
  label,
  onCheck,
  checked,
  disabled,
  readOnly,
}) => {
  const handleOnCheck: ChangeEventHandler<HTMLInputElement> = (e) => {
    onCheck(!!e.target.checked);
  };

  return (
    <StyledLabelWrapper>
      <StyledInput
        id={id}
        name={name}
        type='checkbox'
        checked={checked}
        readOnly={readOnly}
        disabled={disabled}
        onChange={handleOnCheck}
      />
      <StyledCheckIcon />
      {label && <StyledSpan>{label}</StyledSpan>}
    </StyledLabelWrapper>
  );
});

export default Checkbox;