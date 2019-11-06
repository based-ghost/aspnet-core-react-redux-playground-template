import React from "react";
import { ReduxAction } from "../../../store";
import { Checkbox } from '../../../components';

type CheckboxFormGroupProps = {
  readonly checked: boolean;
  readonly onCheck: (checked: boolean) => ReduxAction;
};

const CheckboxFormGroup = React.memo<CheckboxFormGroupProps>(({ checked, onCheck }) => (
  <div className='column'>
    <h3 className='title is-4'>Checkbox</h3>
    <h5 className='subtitle is-5'>Toggle the checkbox</h5>
    <p className='subtitle is-5'>
      Checked: <code>{checked.toString()}</code>
    </p>
    <div className='field'>
      <Checkbox
        checked={checked}
        onCheck={onCheck}
      />
    </div>
  </div>
));

export default CheckboxFormGroup;