import React from 'react';
import { TextInput } from '../../../hooks';
import { createClassName } from '../../../utils';
import { FontAwesomeIconMemo } from '../../../components';

type PasswordInputProps = {
  readonly textInput: TextInput;
  readonly showPassword: boolean;
  readonly isInputInvalid: boolean;
  readonly toggleShowPassword: () => void;
};

const PasswordInput = React.memo<PasswordInputProps>(({
  textInput,
  showPassword,
  isInputInvalid,
  toggleShowPassword
}) => {
  const { hasValue, bindToInput } = textInput;

  const className = createClassName([
    'input',
    'is-medium',
    (isInputInvalid && !hasValue) && 'is-danger',
  ]);

  return (
    <div className='field'>
      <div className='control has-icons-left has-icons-right'>
        <input
          {...bindToInput}
          className={className}
          placeholder='Password'
        />
        <span className='icon is-left'>
          <FontAwesomeIconMemo icon='lock' />
        </span>
        <span
          onClick={toggleShowPassword}
          className='icon is-right icon-clickable'
          data-tooltip={!showPassword ? 'Show password' : 'Hide password'}
        >
          <FontAwesomeIconMemo icon={!showPassword ? 'eye' : 'eye-slash'} />
        </span>
      </div>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;