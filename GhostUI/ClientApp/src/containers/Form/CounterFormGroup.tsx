import { memo } from 'react';
import { actionCreators } from '../../store/form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CounterFormGroupProps = Readonly<{
  count: number;
  increment: typeof actionCreators.increment;
  decrement: typeof actionCreators.decrement;
}>;

const CounterFormGroup = memo<CounterFormGroupProps>(({
  count,
  increment,
  decrement
}) => (
  <div className='column'>
    <h3 className='title is-4'>Counter</h3>
    <h5 className='subtitle is-5'>Use buttons to update count value</h5>
    <p className='buttons incrementer-buttons form-control-group'>
      <button
        onClick={decrement}
        className='button is-light minus'
      >
        <FontAwesomeIcon icon='minus' />
      </button>
      <button
        onClick={increment}
        className='button is-light plus'
      >
        <FontAwesomeIcon icon='plus' />
      </button>
    </p>
    <p className='subtitle is-5'>
      Current count: <code>{count}</code>
    </p>
  </div>
));

CounterFormGroup.displayName = 'CounterFormGroup';

export default CounterFormGroup;
