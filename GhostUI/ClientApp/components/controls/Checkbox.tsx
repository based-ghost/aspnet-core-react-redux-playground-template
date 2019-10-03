import React from 'react';

type CheckboxProps = {
  checked: boolean;
  disabled?: boolean;
  wrapperClass?: string;
  controlClass?: string;
  trailingLabel?: string;
  onCheck: (checked: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({
  onCheck,
  checked,
  disabled,
  wrapperClass,
  controlClass,
  trailingLabel,
}) => {
  const handleOnCheck: React.MouseEventHandler<HTMLInputElement> = e => {
    onCheck(!!e.currentTarget.checked);
  };

  return (
    <div className={(`control ${wrapperClass || ''}`).trim()}>
      <p className={(`checkbox-control ${controlClass || ''}`).trim()}>
        <label>
          <input
            type='checkbox'
            disabled={disabled}
            defaultChecked={!!checked}
            onClick={handleOnCheck}
          />
          <i className='helper' />
          {trailingLabel && <span>{trailingLabel}</span>}
        </label>
      </p>
    </div>
  );
};

export default Checkbox;