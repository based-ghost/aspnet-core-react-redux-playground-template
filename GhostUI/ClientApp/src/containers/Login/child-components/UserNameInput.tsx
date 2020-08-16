import React from 'react';
import { TextInput } from '../../../hooks';
import { createClassName } from '../../../utils';
import { FontAwesomeIconMemo } from '../../../components';

type UserNameInputProps = {
  readonly textInput: TextInput;
  readonly isInputInvalid: boolean;
};

const UserNameInput = React.memo<UserNameInputProps>(
  ({ textInput, isInputInvalid }) => {
    const { hasValue, bindToInput } = textInput;

    const className = createClassName([
      'input',
      'is-medium',
      (isInputInvalid && !hasValue) && 'is-danger',
    ]);

    return (
      <div className='field'>
        <div className='control has-icons-left'>
          <input
            autoFocus
            {...bindToInput}
            className={className}
            placeholder='Username'
          />
          <span className='icon is-left'>
            <FontAwesomeIconMemo icon='user' />
          </span>
        </div>
      </div>
    );
  }
);

UserNameInput.displayName = 'UserNameInput';

export default UserNameInput;
