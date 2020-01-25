import React from "react";
import { ReduxAction } from "../../../store";
import { FontAwesomeIconMemo } from "../../../components";

type CounterFormGroupProps = {
  readonly count: number;
  readonly increment: () => ReduxAction;
  readonly decrement: () => ReduxAction;
};

const CounterFormGroup = React.memo<CounterFormGroupProps>(({
  count,
  increment,
  decrement
}) => (
  <div className="column">
    <h3 className="title is-4">Counter</h3>
    <h5 className="subtitle is-5">Use buttons to update count value</h5>
    <p className="buttons incrementer-buttons form-control-group">
      <button onClick={decrement} className="button is-light minus">
        <FontAwesomeIconMemo icon="minus" />
      </button>
      <button onClick={increment} className="button is-light plus">
        <FontAwesomeIconMemo icon="plus" />
      </button>
    </p>
    <p className="subtitle is-5">
      Current count: <code>{count}</code>
    </p>
  </div>
));

CounterFormGroup.displayName = 'CounterFormGroup';

export default CounterFormGroup;