import React from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../store';
import { RouteComponentProps } from 'react-router-dom';
import { actionCreators, reducer } from '../store/form';
import { DROPDOWN_TEST_DATA } from '../config/constants';
import { Checkbox, Dropdown } from '../components/controls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type FormProps = ReturnType<typeof reducer> &
  typeof actionCreators &
  RouteComponentProps<{}>;

const Form: React.FC<FormProps> = props => {
  const renderCounterGroup: React.ReactNode = (
    <div className='column'>
      <h3 className='title is-4'>Counter</h3>
      <h5 className='subtitle is-5'>Simple example of a React component</h5>
      <p className='subtitle is-5'>
        Current count: <strong>{props.count}</strong>
      </p>
      <p className='buttons incrementer-buttons'>
        <button className='button is-danger' onClick={() => props.decrement()}>
          <FontAwesomeIcon icon='minus' />
          Decrement
        </button>
        <button className='button is-success' onClick={() => props.increment()}>
          <FontAwesomeIcon icon='plus' />
          Increment
        </button>
      </p>
    </div>
  );

  const renderDropdownGroup: React.ReactNode = (
    <div className='column'>
      <h3 className='title is-4'>Dropdown</h3>
      <h5 className='subtitle is-5'>Select an option from the dropdown</h5>
      <p className='subtitle is-5'>
        Option: <strong>{JSON.stringify(props.selectedDropdownOption)}</strong>
      </p>
      <div className='field'>
        <Dropdown
          options={DROPDOWN_TEST_DATA}
          labelKey='label'
          selectedOptionLabel={props.selectedDropdownOption.label}
          wrapperClass='normal-width'
          dispatchHandler={props.selectOption}
        />
      </div>
    </div>
  );

  const renderCheckboxGroup: React.ReactNode = (
    <div className='column'>
      <h3 className='title is-4'>Checkbox</h3>
      <h5 className='subtitle is-5'>Toggle the checkbox</h5>
      <p className='subtitle is-5'>
        Checked: <strong>{props.checkboxValue.toString()}</strong>
      </p>
      <div className='field'>
        <Checkbox onCheck={props.doCheck} checked={props.checkboxValue} />
      </div>
    </div>
  );

  return (
    <section className='section'>
      <div className='container is-centered box'>
        <div className='columns form-columns'>
          {renderCounterGroup}
          {renderDropdownGroup}
          {renderCheckboxGroup}
        </div>
      </div>
    </section>
  );
};

// Wire up the React component to the Redux store
export default connect(
  (state: IApplicationState) => state.form,
  actionCreators
)(Form);
