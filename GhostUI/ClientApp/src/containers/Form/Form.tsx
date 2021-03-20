import SelectFormGroup from './SelectFormGroup';
import CounterFormGroup from './CounterFormGroup';
import CheckboxFormGroup from './CheckboxFormGroup';

import type { FunctionComponent } from 'react';

const Form: FunctionComponent = () => (
  <section className='section'>
    <div className='container'>
      <h3 className='title is-3'>Form Controls</h3>
      <div className='box container-box'>
        <div className='columns form-columns'>
          <CounterFormGroup />
          <SelectFormGroup />
          <CheckboxFormGroup />
        </div>
      </div>
    </div>
  </section>
);

export default Form;
