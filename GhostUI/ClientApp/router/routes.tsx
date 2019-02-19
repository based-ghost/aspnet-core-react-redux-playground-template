import * as React from 'react';
import { Route } from 'react-router-dom';
import { RoutesConfig } from './routes-config';
import { App, Dashboard, FetchData, Form, Login } from '../pages';

const routes: React.ReactNode = (
    <App>
        <Route exact path={RoutesConfig.Login.path} component={Login} />
        <Route path={RoutesConfig.Form.path} component={Form} />
        <Route path={RoutesConfig.Dashboard.path} render={() => <Dashboard />} />
        <Route path={RoutesConfig.FetchData.path.Absolute} component={FetchData} />
    </App>
);

export default routes;