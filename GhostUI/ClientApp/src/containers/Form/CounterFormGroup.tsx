import type { FunctionComponent } from 'react';
import { increment, decrement } from '../../store/formSlice';
import { useAppSelector, useAppDispatch } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CounterFormGroup: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector<number>((state) => state.form.count);

  return (
    <div className='column'>
      <h3 className='title is-4'>Counter</h3>
      <h5 className='subtitle is-5'>Use buttons to increment/decrement</h5>
      <p className='buttons incrementer-buttons form-control-group'>
        <button
          className='button is-info'
          onClick={() => dispatch(decrement())}
        >
          <FontAwesomeIcon icon='minus' />
        </button>
        <button
          className='button is-info'
          onClick={() => dispatch(increment())}
        >
          <FontAwesomeIcon icon='plus' />
        </button>
      </p>
      <p className='subtitle is-5'>
        Value: <code className="form-value">{count}</code>
      </p>
    </div>
  );
};

export default CounterFormGroup;
