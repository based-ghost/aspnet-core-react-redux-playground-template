import * as React from 'react';
import { Column_1, Column_2 } from '../config/dashboard-content';

const Dashboard: React.SFC<{}> = () => (
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
                        <div className='bd-notification is-flex is-horizontal-center'>
                            <img src={require('../assets/image/react-redux-aspcore-logo.png')} alt='' />
                        </div>
                        <div className='columns is-multiline is-mobile'>
                            <div className='column dashboard-info is-half'>
                                <div className='bd-notification'>
                                    {Column_1}
                                </div>
                            </div>
                            <div className='column dashboard-info is-half'>
                                <div className='bd-notification'>
                                    {Column_2}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);

export default Dashboard;