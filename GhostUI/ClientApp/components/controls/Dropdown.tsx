import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { checkIsArrayOfObjects } from '../../utils/helpers';

type DropdownProps = {
  options: any[];
  placeholder?: string;
  disabled?: boolean;
  buttonClass?: string;
  wrapperClass?: string;
  labelKey: string;
  selectedOptionLabel?: string;
  dispatchHandler: (option: any) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  disabled,
  labelKey,
  placeholder,
  buttonClass,
  wrapperClass,
  dispatchHandler,
  selectedOptionLabel,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isArrayOfObjects, setIsArrayOfObjects] = useState<boolean>(() => checkIsArrayOfObjects(options));

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const onOutsideClick = useCallback(() => {
    setOpen(false);
  }, []);

  const onInsideClick = useCallback(() => {
    setOpen(open => !open);
  }, []);

  useOnClickOutside(
    buttonRef,
    onOutsideClick,
    onInsideClick
  );

  useEffect(() => {
    setIsArrayOfObjects(checkIsArrayOfObjects(options));
  }, [options]);

  const getOptionLabelName = (option: any): string => {
    return isArrayOfObjects ? option[labelKey] || option[0] : option;
  };

  const keyDownHandler: React.KeyboardEventHandler<HTMLButtonElement> = e => {
    if (e.keyCode === 38 || e.keyCode === 40) { // up and down keys
      e.preventDefault();
      setOpen(open => !open);
    } else if (e.keyCode === 27) { // Esc key
      buttonRef.current.focus();
      setOpen(false);
    } else if (e.keyCode === 9) { // Tab key
      setOpen(false);
    }
  };

  return (
    <div
      className={(`dropdown ${wrapperClass || ''} ${open ? 'is-active' : ''}`).trim()}
    >
      <button
        className={(`button ${buttonClass || ''}`).trim()}
        type='button'
        disabled={disabled}
        ref={buttonRef}
        onKeyDown={keyDownHandler}
        aria-haspopup='true'
        aria-controls='dropdown-menu'
      >
        <span>{selectedOptionLabel || placeholder}</span>
        <span className='caret-select' />
      </button>
      <div className='dropdown-menu' role='menu'>
        <ul className='dropdown-content'>
          {options.map((option: any) => {
            const optionLbl = getOptionLabelName(option);
            return (
              <li key={optionLbl}>
                <a
                  role='button'
                  className={(`dropdown-item ${optionLbl === selectedOptionLabel ? 'selected-option' : ''}`).trim()}
                  onClick={() => dispatchHandler(option)}
                >
                  {optionLbl}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;