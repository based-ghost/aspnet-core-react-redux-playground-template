import * as React from 'react';

// React 16.6 introduced the ability to wrap Functional Components with React.memo which now gives us the ability to prevent functional components from
// rerendering every time and only when the props change - this is very similar to using React.PureComponent with class components

// 16.8 introduced "Hooks" which will now enable functional components to be opt in stateful by using "useState" - this means they are technically no longer
// stateless functional components (React.SFC<{}>) but are now React.FunctionComponent

type SpinnerProps = { loading?: boolean; };

const Spinner: React.FunctionComponent<SpinnerProps> = (props) => (
    <div id='load-spinner' style={{ display: !!props.loading ? 'inline-block' : 'none' }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default React.memo(Spinner);