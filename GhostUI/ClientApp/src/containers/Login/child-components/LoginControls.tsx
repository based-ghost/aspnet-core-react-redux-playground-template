import React, { Fragment } from 'react';
import { Checkbox, FontAwesomeIconMemo } from '../../../components';

type LoginControlsProps = {
  readonly rememberMe: boolean;
  readonly handleRememberMeCheck: (checked: boolean) => void;
};

const LoginControls = React.memo<LoginControlsProps>(({
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
    <button type='submit' className='button is-info is-medium is-fullwidth'>
      <span>Login</span>
      <span className='icon'>
        <FontAwesomeIconMemo icon='sign-in-alt' />
      </span>
    </button>
  </Fragment>
));

LoginControls.displayName = 'LoginControls';

export default LoginControls;