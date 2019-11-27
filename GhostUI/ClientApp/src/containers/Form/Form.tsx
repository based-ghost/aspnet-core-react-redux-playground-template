import React from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store';
import { RouteComponentProps } from 'react-router-dom';
import { actionCreators, reducer } from '../../store/form';
import { DROPDOWN_TEST_DATA } from '../../config/constants';
import { SelectFormGroup, CounterFormGroup, CheckboxFormGroup } from "./child-components";

type FormProps = ReturnType<typeof reducer>
  & typeof actionCreators
  & RouteComponentProps<{}>;

const Form: React.FC<FormProps> = ({
  count,
  increment,
  decrement,
  selectOption,
  checkboxValue,
  handleOnCheck,
  selectedDropdownOption,
}) => (
  <section className='section'>
    <div className='container is-centered box'>
      <div className='columns form-columns'>
        <CounterFormGroup
          count={count}
          increment={increment}
          decrement={decrement}
        />
        <SelectFormGroup
          options={DROPDOWN_TEST_DATA}
          onSelectOption={selectOption}
          selectedOption={selectedDropdownOption}
        />
        <CheckboxFormGroup
          checked={checkboxValue}
          onCheck={handleOnCheck}
        />
      </div>
    </div>
  </section>
);

const mapStateToProps = (state: IApplicationState) => state.form;

export default connect(mapStateToProps, actionCreators)(Form);
