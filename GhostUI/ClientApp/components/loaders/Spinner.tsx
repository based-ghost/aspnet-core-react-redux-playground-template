import React from 'react';

const Spinner: React.FC<{ loading?: boolean; }> = (props) => (
    <div id='load-spinner' style={{ display: !!props.loading ? 'inline-block' : 'none' }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default Spinner;