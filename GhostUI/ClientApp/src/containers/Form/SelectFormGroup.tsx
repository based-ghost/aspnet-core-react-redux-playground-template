import { useCallback, type FunctionComponent } from 'react';
import { Select } from 'react-functional-select';
import { useDispatch, useSelector } from 'react-redux';
import { THEME_CONFIG, DROPDOWN_TEST_DATA } from '../../config';
import { actionCreators, type IDropdownOption } from '../../store/form';
import type { RootState } from '../../store';

const SelectFormGroup: FunctionComponent = () => {
  const dispatch = useDispatch();
  const selectedOption = useSelector<RootState, IDropdownOption>((state) => state.form.selectedOption);

  const onOptionChange = useCallback((option: IDropdownOption) => {
    dispatch(actionCreators.selectOption(option));
  }, [dispatch]);

  return (
    <div className='column'>
      <h3 className='title is-4'>Dropdown</h3>
      <h5 className='subtitle is-5'>Select options from the dropdown</h5>
      <div className='field form-control-group'>
        <Select
          themeConfig={THEME_CONFIG}
          options={DROPDOWN_TEST_DATA}
          initialValue={selectedOption}
          onOptionChange={onOptionChange}
        />
      </div>
      <p className='subtitle is-5'>
        Value: <code className="form-value">{selectedOption?.label}</code>
      </p>
    </div>
  );
};

export default SelectFormGroup;
