import React from 'react';
import { Layout } from './components';
import { Route, Switch } from 'react-router-dom';
import { RoutesConfig } from './config/routes.config';
import { Dashboard, FetchData, Form, Login } from './views';

export const routes: JSX.Element = (
  <Layout>
    <Switch>
      <Route exact path={RoutesConfig.Login.path} component={Login} />
      <Route path={RoutesConfig.Form.path} component={Form} />
      <Route path={RoutesConfig.Dashboard.path} component={Dashboard} />
      <Route path={RoutesConfig.FetchData.pathAbsolute} component={FetchData} />
    </Switch>
  </Layout>
);