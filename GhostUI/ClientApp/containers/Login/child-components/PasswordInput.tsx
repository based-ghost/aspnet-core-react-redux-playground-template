import React from "react";
import { TextInput } from "../../../hooks";
import { createClassName } from "../../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PasswordInputProps = {
  readonly textInput: TextInput;
  readonly showPassword: boolean;
  readonly isInputInvalid: boolean;
  readonly toggleShowPassword: () => void;
};

export const PasswordInput = React.memo<PasswordInputProps>(({
  textInput,
  showPassword,
  isInputInvalid,
  toggleShowPassword,
}) => {
  const { hasValue, bindToInput } = textInput;
  const toolTipIcon = !showPassword ? 'eye' : 'eye-slash';
  const toolTipMsg = !showPassword ? 'Show password' : 'Hide password';

  const className = createClassName([
    'input',
    'is-large',
    (isInputInvalid && !hasValue) && 'is-danger',
  ]);

  return (
    <div className="field">
      <div className="control has-icons-left has-icons-right">
        <input
          {...bindToInput}
          className={className}
          placeholder="Password"
        />
        <span className="icon is-left">
          <FontAwesomeIcon icon="lock" />
        </span>
        <span
          data-tooltip={toolTipMsg}
          onClick={toggleShowPassword}
          className="icon is-right icon-clickable"
        >
          <FontAwesomeIcon icon={toolTipIcon} />
        </span>
      </div>
    </div>
  );
});