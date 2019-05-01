import React from 'react';

const Spinner: React.FC<{ loading?: boolean }> = ({ loading }) => (
  <div id='load-spinner' style={{ display: loading ? 'inline-block' : 'none' }}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Spinner;