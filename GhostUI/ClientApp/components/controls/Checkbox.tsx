import React, { ChangeEventHandler } from 'react';

type CheckboxProps = {
  readonly checked: boolean;
  readonly disabled?: boolean;
  readonly readOnly?: boolean;
  readonly wrapperClass?: string;
  readonly controlClass?: string;
  readonly trailingLabel?: string;
  readonly onCheck: (checked: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({
  onCheck,
  checked,
  disabled,
  readOnly,
  wrapperClass,
  controlClass,
  trailingLabel,
}) => {
  const handleOnCheck: ChangeEventHandler<HTMLInputElement> = (event) => {
    onCheck(!!event.target.checked);
  };

  return (
    <div className={(`control ${wrapperClass || ''}`).trim()}>
      <p className={(`checkbox-control ${controlClass || ''}`).trim()}>
        <label>
          <input
            type='checkbox'
            checked={checked}
            readOnly={readOnly}
            disabled={disabled}
            onChange={handleOnCheck}
          />
          <i className='helper' />
          {trailingLabel && <span>{trailingLabel}</span>}
        </label>
      </p>
    </div>
  );
};

export default Checkbox;