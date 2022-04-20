import { Checkbox } from '../../components';
import { setChecked } from '../../store/formSlice';
import { useCallback, type FunctionComponent } from 'react';
import { useAppSelector, useAppDispatch } from '../../store';

const CheckboxFormGroup: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const checked = useAppSelector<boolean>((state) => state.form.checked);

  const handleOnCheck = useCallback((checked: boolean) => {
    dispatch(setChecked(checked));
  }, [dispatch]);

  return (
    <div className="column">
      <h3 className="title is-4">Checkbox</h3>
      <h5 className="subtitle is-5">Toggle the checkbox</h5>
      <div className="field form-control-group">
        <Checkbox
          checked={checked}
          onCheck={handleOnCheck}
        />
      </div>
      <p className="subtitle is-5">
        Value: <code className="form-value">{checked.toString()}</code>
      </p>
    </div>
  );
};

export default CheckboxFormGroup;