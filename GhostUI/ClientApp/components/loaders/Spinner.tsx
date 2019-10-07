import React from 'react';

type SpinnerProps = {
  readonly loading?: boolean;
};

const Spinner = React.memo<SpinnerProps>(({ loading }) => (
  <div
    id='load-spinner'
    style={{ display: loading ? 'inline-block' : 'none' }}
  >
    <div />
    <div />
    <div />
    <div />
  </div>
));

export default Spinner;