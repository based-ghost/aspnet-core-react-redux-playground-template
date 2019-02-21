import * as React from 'react';
import App from './app';
import { Route, Switch  } from 'react-router-dom';
import { RoutesConfig } from './config/routes.config';
import { Dashboard, FetchData, Form, Login } from './views';

const routes: React.ReactNode = (
    <App>
        <Switch>
            <Route exact path={RoutesConfig.Login.path} component={Login} />
            <Route path={RoutesConfig.Form.path} component={Form} />
            <Route path={RoutesConfig.Dashboard.path} render={() => <Dashboard />} />
            <Route path={RoutesConfig.FetchData.path.Absolute} component={FetchData} />
        </Switch>
    </App>
);

export default routes;