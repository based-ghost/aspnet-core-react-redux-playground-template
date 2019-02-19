import * as React from 'react';
import { Column_1, Column_2 } from '../config/dashboard-content';

// React 16.6 introduced the ability to wrap Functional Components with React.memo which now gives us the ability to prevent functional components from
// rerendering every time and only when the props change - this is very similar to using React.PureComponent with class components

// React 16.8 introduced "Hooks" which will now enable functional components to be opt in stateful by using "useState" - this means they are technically no longer
// stateless functional components (React.SFC<{}>) but are now React.FunctionComponent

// Prop Type check error in 'react-router' - exporting this component wrapped in React.memo causesa false-positive for a type error when referenced as:
// <Route path={RoutesConfig.Dashboard.path} component={Dashboard} />
// in routes.tsx
// need to change to:
// <Route path={RoutesConfig.Dashboard.path} render={() => <Dashboard />} />

const Dashboard: React.FunctionComponent<{}> = () => (
    <div className='dashboard-wrapper'>
        <section className='hero is-dark'>
            <div className='hero-body'>
                <div className='container has-text-centered'>
                    <h1 className='title'>Welcome, User</h1>
                    <h2 className='subtitle'>Check out some highlights from the technology stack below.</h2>
                </div>
            </div>
        </section>
        <section className='container is-fluid'>
            <div className='card'>
                <div className='card-content'>
                    <div className='column'>
                        <div className='is-flex is-horizontal-center'>
                            <img src={require('../assets/image/react-redux-aspcore-logo.png')} alt='' />
                        </div>
                        <div className='columns is-multiline'>
                            <div className='column dashboard-info is-half'>
                                {Column_1}
                            </div>
                            <div className='column dashboard-info is-half'>
                                {Column_2}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);

export default React.memo(Dashboard);