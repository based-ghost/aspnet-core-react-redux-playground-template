import { memo } from 'react';
import { classNames } from '../../utils';
import { useTextInput } from '../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type UserNameInputProps = Readonly<{
  isInputInvalid: boolean;
  textInput: ReturnType<typeof useTextInput>;
}>;

const UserNameInput = memo<UserNameInputProps>(({ textInput, isInputInvalid }) => {
  const { hasValue, bindToInput } = textInput;

  const className = classNames([
    'input',
    'is-medium',
    (isInputInvalid && !hasValue) && 'is-danger'
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
          <FontAwesomeIcon icon='user' />
        </span>
      </div>
    </div>
  );
});

UserNameInput.displayName = 'UserNameInput';

export default UserNameInput;
