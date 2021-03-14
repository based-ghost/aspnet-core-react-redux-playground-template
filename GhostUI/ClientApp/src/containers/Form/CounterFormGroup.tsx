import { FunctionComponent } from 'react';
import { RootState } from '../../store';
import { FormActionType } from '../../store/form';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CounterFormGroup: FunctionComponent = () => {
  const dispatch = useDispatch();
  const count = useSelector<RootState, number>((state) => state.form.count);

  return (
    <div className='column'>
      <h3 className='title is-4'>Counter</h3>
      <h5 className='subtitle is-5'>Use buttons to update count value</h5>
      <p className='buttons incrementer-buttons form-control-group'>
        <button
          className='button is-light minus'
          onClick={() => dispatch({ type: FormActionType.DECREMENT })}
        >
          <FontAwesomeIcon icon='minus' />
        </button>
        <button
          className='button is-light plus'
          onClick={() => dispatch({ type: FormActionType.INCREMENT })}
        >
          <FontAwesomeIcon icon='plus' />
        </button>
      </p>
      <p className='subtitle is-5'>
        Current count: <code>{count}</code>
      </p>
    </div>
  );
};

export default CounterFormGroup;
