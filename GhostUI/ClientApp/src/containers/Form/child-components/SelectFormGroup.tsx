import React from "react";
import { ReduxAction } from "../../../store";
import { Select } from 'react-functional-select';
import { IDropdownOption } from "../../../store/form";

type SelectFormGroupProps = {
  readonly options: IDropdownOption[];
  readonly selectedOption: IDropdownOption;
  readonly onSelectOption: (option: IDropdownOption) => ReduxAction;
};

const SelectFormGroup = React.memo<SelectFormGroupProps>(({
  options,
  selectedOption,
  onSelectOption,
}) => (
  <div className='column'>
    <h3 className='title is-4'>Dropdown</h3>
    <h5 className='subtitle is-5'>Select an option from the dropdown</h5>
    <p className='subtitle is-5'>
      Option: <code>{JSON.stringify(selectedOption || {})}</code>
    </p>
    <div className='field'>
      <Select
        options={options}
        initialValue={selectedOption}
        onOptionChange={onSelectOption}
      />
    </div>
  </div>
));

SelectFormGroup.displayName = 'SelectFormGroup';

export default SelectFormGroup;