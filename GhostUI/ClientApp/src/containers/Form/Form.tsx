import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import SelectFormGroup from './SelectFormGroup';
import CounterFormGroup from './CounterFormGroup';
import CheckboxFormGroup from './CheckboxFormGroup';
import { actionCreators, reducer } from '../../store/form';
import { THEME_CONFIG, DROPDOWN_TEST_DATA } from '../../config';

type FormProps = ReturnType<typeof reducer> & typeof actionCreators;

const Form: FunctionComponent<FormProps> = ({
  count,
  increment,
  decrement,
  selectOption,
  checkboxValue,
  handleOnCheck,
  selectedDropdownOption
}) => (
  <section className='section'>
    <div className='container'>
      <h3 className='title is-3'>Form Controls</h3>
      <div className='box container-box'>
        <div className='columns form-columns'>
          <CounterFormGroup
            count={count}
            increment={increment}
            decrement={decrement}
          />
          <SelectFormGroup
            themeConfig={THEME_CONFIG}
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
    </div>
  </section>
);

const mapStateToProps = (state: RootState) => state.form;

export default connect(mapStateToProps, actionCreators)(Form);
