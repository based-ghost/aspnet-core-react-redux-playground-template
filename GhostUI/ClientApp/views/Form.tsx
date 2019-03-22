import * as React from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../store';
import { boundMethod } from 'autobind-decorator';
import { RouteComponentProps } from 'react-router-dom';
import { actionCreators, reducer } from '../store/form';
import { DROPDOWN_TEST_DATA } from '../config/constants';
import { Checkbox, Dropdown } from '../components/controls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type FormProps = ReturnType<typeof reducer> & typeof actionCreators & RouteComponentProps<{}>;

class Form extends React.Component<FormProps> {
    public render(): React.ReactNode {
        return (
            <section className='section'>
                <div className='container is-centered box'>
                    <div className='columns form-columns'>
                        { this.renderCounterGroup() }
                        { this.renderDropdownGroup() }
                        { this.renderCheckboxGroup() }
                    </div>
                </div>
            </section>
        );
    }

    private renderCounterGroup(): React.ReactNode {
        return (
            <div className='column'>
                <h3 className='title is-4'>Counter</h3>
                <h5 className='subtitle is-5'>Simple example of a React component</h5>
                <p className='subtitle is-5'>Current count: <strong>{this.props.count}</strong></p>
                <p className='buttons'>
                    <button className='button is-danger' onClick={this.decrementCount}>
                        <span className='icon'>
                            <FontAwesomeIcon icon='minus' />
                        </span>
                        <span>Decrement</span>
                    </button>
                    <button className='button is-success' onClick={this.incrementCount}>
                        <span className='icon'>
                            <FontAwesomeIcon icon='plus' />
                        </span>
                        <span>Increment</span>
                    </button>
                </p>
            </div>
        );
    }

    private renderDropdownGroup(): React.ReactNode {
        return (
            <div className='column'>
                <h3 className='title is-4'>Dropdown</h3>
                <h5 className='subtitle is-5'>Select an option from the dropdown</h5>
                <p className='subtitle is-5'>Option: <strong>{JSON.stringify(this.props.selectedDropdownOption)}</strong></p>
                <div className='field'>
                    <Dropdown options={DROPDOWN_TEST_DATA}
                              labelKey='label'
                              selectedOptionLabel={this.props.selectedDropdownOption.label}
                              wrapperClass='normal-width'
                              dispatchHandler={this.props.selectOption} />
                </div>
            </div>
        );
    }

    private renderCheckboxGroup(): React.ReactNode {
        return (
            <div className='column'>
                <h3 className='title is-4'>Checkbox</h3>
                <h5 className='subtitle is-5'>Toggle the checkbox</h5>
                <p className='subtitle is-5'>Checked: <strong>{this.props.checkboxValue.toString()}</strong></p>
                <div className='field'>
                    <Checkbox dispatchHandler={this.props.doCheck} checked={this.props.checkboxValue} />
                </div>
            </div>
        );
    }

    @boundMethod
    private decrementCount(): void {
        this.props.decrement();
    }

    @boundMethod
    private incrementCount(): void {
        this.props.increment();
    }
}

// Wire up the React component to the Redux store
export default connect((state: IApplicationState) => state.form, actionCreators)(Form);