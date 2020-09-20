import React from 'react';
import { Select, Theme } from 'react-functional-select';
import { stringifyJavaScriptObj } from '../../../utils';
import { IDropdownOption, actionCreators } from '../../../store/form';

type SelectFormGroupProps = {
  readonly themeConfig?: Theme;
  readonly options: IDropdownOption[];
  readonly selectedOption: IDropdownOption;
  readonly onSelectOption: typeof actionCreators.selectOption;
};

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
        Option: <code>{stringifyJavaScriptObj(selectedOption)}</code>
      </p>
    </div>
  )
);

SelectFormGroup.displayName = 'SelectFormGroup';

export default SelectFormGroup;
