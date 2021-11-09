import { actionCreators } from '../../store/form';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { RootState } from '../../store';
import type { FunctionComponent } from 'react';

const CounterFormGroup: FunctionComponent = () => {
  const count = useSelector<RootState, number>((state) => state.form.count);

  const dispatch = useDispatch();
  const decrement = () => dispatch(actionCreators.decrement());
  const increment = () => dispatch(actionCreators.increment());

  return (
    <div className='column'>
      <h3 className='title is-4'>Counter</h3>
      <h5 className='subtitle is-5'>Use buttons to increment/decrement</h5>
      <p className='buttons incrementer-buttons form-control-group'>
        <button
          onClick={decrement}
          className='button is-info'
        >
          <FontAwesomeIcon icon='minus' />
        </button>
        <button
          onClick={increment}
          className='button is-info'
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
