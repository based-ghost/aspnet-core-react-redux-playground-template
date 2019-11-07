import React from "react";
import { ReduxAction } from "../../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CounterFormGroupProps = {
  readonly count: number;
  readonly increment: () => ReduxAction;
  readonly decrement: () => ReduxAction;
};

const CounterFormGroup = React.memo<CounterFormGroupProps>(({ count, increment, decrement }) => (
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
));

CounterFormGroup.displayName = 'CounterFormGroup';

export default CounterFormGroup;