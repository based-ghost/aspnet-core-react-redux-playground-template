import * as React from 'react';

// React 16.6 introduced the ability to wrap Functional Components with React.memo which now gives us the ability to prevent functional components from
// rerendering every time and only when the props change - this is very similar to using React.PureComponent with class components

// React 16.8 introduced "Hooks" which will now enable functional components to be opt in stateful by using "useState" - this means they are technically no longer
// stateless functional components (React.SFC<{}>) but are now React.FunctionComponent

const Footer: React.FunctionComponent<{}> = () => (
    <footer className='footer'>
        <hr />
        <div className='content has-text-centered'>&copy; 2019 based-ghost LLC</div>
    </footer>
);

export default React.memo(Footer);