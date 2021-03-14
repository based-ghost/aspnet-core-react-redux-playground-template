import { FunctionComponent, useCallback } from 'react';
import { RootState } from '../../store';
import { Checkbox } from '../../components';
import { actionCreators } from '../../store/form';
import { useDispatch, useSelector } from 'react-redux';

const CheckboxFormGroup: FunctionComponent = () => {
  const dispatch = useDispatch();
  const checked = useSelector<RootState, boolean>((state) => state.form.checkboxValue);

  const onCheckEvent = useCallback((checked: boolean) => {
    dispatch(actionCreators.handleOnCheck(checked));
  }, [dispatch]);

  return (
    <div className="column">
      <h3 className="title is-4">Checkbox</h3>
      <h5 className="subtitle is-5">Toggle the checkbox</h5>
      <div className="field form-control-group">
        <Checkbox
          checked={checked}
          onCheck={onCheckEvent}
        />
      </div>
      <p className="subtitle is-5">
        Checked: <code>{checked.toString()}</code>
      </p>
    </div>
  );
};

export default CheckboxFormGroup;