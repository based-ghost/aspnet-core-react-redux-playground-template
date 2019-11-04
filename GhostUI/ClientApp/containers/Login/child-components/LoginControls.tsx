import React, { Fragment } from "react";
import { Checkbox } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type LoginControlsProps = {
  readonly rememberMe: boolean;
  readonly handleRememberMeCheck: (checked: boolean) => void;
};

export const LoginControls = React.memo<LoginControlsProps>(({
  rememberMe,
  handleRememberMeCheck,
}) => (
  <Fragment>
    <div className="field remember-me-field">
      <Checkbox
        label="Remember me"
        checked={rememberMe}
        onCheck={handleRememberMeCheck}
      />
    </div>
    <button type="submit" className="button is-info is-large is-fullwidth">
      <span>Login</span>
      <span className="icon">
        <FontAwesomeIcon icon="sign-in-alt" />
      </span>
    </button>
  </Fragment>
));