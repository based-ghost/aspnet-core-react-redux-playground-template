import React from 'react';

type SpinnerProps = { loading?: boolean; };

const Spinner: React.FC<SpinnerProps> = (props) => (
    <div id='load-spinner' style={{ display: !!props.loading ? 'inline-block' : 'none' }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default React.memo(Spinner);