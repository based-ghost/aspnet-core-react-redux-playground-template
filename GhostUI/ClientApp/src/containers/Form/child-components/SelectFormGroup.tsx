import React from 'react';
import { ReduxAction } from '../../../store';
import { Select } from 'react-functional-select';
import { IDropdownOption } from '../../../store/form';

type SelectFormGroupProps = {
  readonly themeConfig?: any;
  readonly options: IDropdownOption[];
  readonly selectedOption: IDropdownOption;
  readonly onSelectOption: (option: IDropdownOption) => ReduxAction;
};

const SelectFormGroup = React.memo<SelectFormGroupProps>(({
  options,
  themeConfig,
  selectedOption,
  onSelectOption
}) => (
  <div className='column'>
    <h3 className='title is-4'>Dropdown</h3>
    <h5 className='subtitle is-5'>Select options from the dropdown</h5>
    <div className='field form-control-group'>
      <Select
        options={options}
        themeConfig={themeConfig}
        initialValue={selectedOption}
        onOptionChange={onSelectOption}
      />
    </div>
    <p className='subtitle is-5'>
      Option:{' '}
      <code>
        {JSON.stringify(selectedOption || {}).replace(/"/g, "'")}
      </code>
    </p>
  </div>
));

SelectFormGroup.displayName = 'SelectFormGroup';

export default SelectFormGroup;