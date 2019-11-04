import React from "react";
import { TextInput } from "../../../hooks";
import { createClassName } from "../../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type UserNameInputProps = {
  readonly textInput: TextInput;
  readonly isInputInvalid: boolean;
};

export const UserNameInput = React.memo<UserNameInputProps>(({ textInput, isInputInvalid }) => {
  const { hasValue, bindToInput } = textInput;

  const className = createClassName([
    'input',
    'is-large',
    (isInputInvalid && !hasValue) && 'is-danger',
  ]);

  return (
    <div className="field">
      <div className="control has-icons-left">
        <input
          autoFocus
          {...bindToInput}
          className={className}
          placeholder="Username"
        />
        <span className="icon is-left">
          <FontAwesomeIcon icon="user" />
        </span>
      </div>
    </div>
  );
});