import { Select } from 'react-functional-select';
import { useCallback, type FunctionComponent } from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import { THEME_CONFIG, DROPDOWN_TEST_DATA } from '../../config';
import { selectOption, type SelectOption } from '../../store/formSlice';

const SelectFormGroup: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const selectedOption = useAppSelector<SelectOption>((state) => state.form.selectedOption);

  const onOptionChange = useCallback((option: SelectOption) => {
    dispatch(selectOption(option));
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
