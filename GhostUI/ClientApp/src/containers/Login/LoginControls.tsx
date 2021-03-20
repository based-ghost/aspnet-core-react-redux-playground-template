import { memo, Fragment } from 'react';
import { Checkbox } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type LoginControlsProps = Readonly<{
  rememberMe: boolean;
  handleRememberMeCheck: (checked: boolean) => void;
}>;

const LoginControls = memo<LoginControlsProps>(({
  rememberMe,
  handleRememberMeCheck
}) => (
  <Fragment>
    <div className='field remember-me-field'>
      <Checkbox
        label='Remember me'
        checked={rememberMe}
        onCheck={handleRememberMeCheck}
      />
    </div>
    <button
      type='submit'
      className='button is-info is-medium is-fullwidth'
    >
      <span>Login</span>
      <span className='icon'>
        <FontAwesomeIcon icon='sign-in-alt' />
      </span>
    </button>
  </Fragment>
));

LoginControls.displayName = 'LoginControls';

export default LoginControls;
