import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RoutesConfig } from './config/routes.config';
import { Dashboard, FetchData, Form, Layout, Login } from './views';

export const routes: React.ReactNode = (
    <Layout>
        <Switch>
            <Route exact path={RoutesConfig.Login.path} component={Login} />
            <Route path={RoutesConfig.Form.path} component={Form} />
            <Route path={RoutesConfig.Dashboard.path} component={Dashboard} />
            <Route path={RoutesConfig.FetchData.path.Absolute} component={FetchData} />
        </Switch>
    </Layout>
);