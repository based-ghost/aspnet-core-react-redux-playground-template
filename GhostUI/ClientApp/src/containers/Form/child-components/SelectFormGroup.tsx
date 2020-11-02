import React from 'react';
import { formatJavaScriptObj } from '../../../utils';
import { Select, Theme } from 'react-functional-select';
import { IDropdownOption, actionCreators } from '../../../store/form';

type SelectFormGroupProps = Readonly<{
  themeConfig?: Theme;
  options: IDropdownOption[];
  selectedOption: IDropdownOption;
  onSelectOption: typeof actionCreators.selectOption;
}>;

const SelectFormGroup = React.memo<SelectFormGroupProps>(
  ({ options, themeConfig, selectedOption, onSelectOption }) => (
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
        Option: <code>{formatJavaScriptObj(selectedOption)}</code>
      </p>
    </div>
  )
);

SelectFormGroup.displayName = 'SelectFormGroup';

export default SelectFormGroup;
