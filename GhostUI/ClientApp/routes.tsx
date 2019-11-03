import React from 'react';
import { Layout } from './Layout';
import { Route, Switch } from 'react-router-dom';
import { RoutesConfig } from './config/routes.config';
import { Dashboard, FetchData, Form, Login } from './containers';

export const routes: React.ReactNode = (
  <Layout>
    <Switch>
      <Route exact path={RoutesConfig.Login.path} component={Login} />
      <Route path={RoutesConfig.Form.path} component={Form} />
      <Route path={RoutesConfig.Dashboard.path} component={Dashboard} />
      <Route path={RoutesConfig.FetchData.pathAbsolute} component={FetchData} />
    </Switch>
  </Layout>
);