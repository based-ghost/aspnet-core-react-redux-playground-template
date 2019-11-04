import React from 'react';
import { connect } from 'react-redux';
import { Checkbox } from '../../components';
import { IApplicationState } from '../../store';
import { Select } from 'react-functional-select';
import { RouteComponentProps } from 'react-router-dom';
import { actionCreators, reducer } from '../../store/form';
import { DROPDOWN_TEST_DATA } from '../../config/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type FormProps = ReturnType<typeof reducer> & typeof actionCreators & RouteComponentProps<{}>;

const Form: React.FC<FormProps> = ({
  count,
  increment,
  decrement,
  selectOption,
  checkboxValue,
  handleOnCheck,
  selectedDropdownOption,
}) => {
  const counterGroupNode: React.ReactNode = (
    <div className='column'>
      <h3 className='title is-4'>Counter</h3>
      <h5 className='subtitle is-5'>Simple example of a React component</h5>
      <p className='subtitle is-5'>Current count: <code>{count}</code></p>
      <p className='buttons incrementer-buttons'>
        <button className='button is-light minus' onClick={decrement}>
          <FontAwesomeIcon icon='minus' />Decrement
        </button>
        <button className='button is-light plus' onClick={increment}>
          <FontAwesomeIcon icon='plus' />Increment
        </button>
      </p>
    </div>
  );

  const dropdownGroupNode: React.ReactNode = (
    <div className='column'>
      <h3 className='title is-4'>Dropdown</h3>
      <h5 className='subtitle is-5'>Select an option from the dropdown</h5>
      <p className='subtitle is-5'>Option: <code>{JSON.stringify(selectedDropdownOption || {})}</code></p>
      <div className='field'>
        <Select
          options={DROPDOWN_TEST_DATA}
          onOptionChange={selectOption}
          initialValue={selectedDropdownOption}
        />
      </div>
    </div>
  );

  const checkboxGroupNode: React.ReactNode = (
    <div className='column'>
      <h3 className='title is-4'>Checkbox</h3>
      <h5 className='subtitle is-5'>Toggle the checkbox</h5>
      <p className='subtitle is-5'>Checked: <code>{checkboxValue.toString()}</code></p>
      <div className='field'>
        <Checkbox
          checked={checkboxValue}
          onCheck={handleOnCheck}
        />
      </div>
    </div>
  );

  return (
    <section className='section'>
      <div className='container is-centered box'>
        <div className='columns form-columns'>
          {counterGroupNode}
          {dropdownGroupNode}
          {checkboxGroupNode}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state: IApplicationState) => state.form;

export default connect(mapStateToProps, actionCreators)(Form);
