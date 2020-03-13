import React, { ReactNode } from 'react';
import Layout from '../Layout';
import { AnimatedSwitch } from './AnimatedSwitch';
import { Route, Switch, withRouter } from 'react-router-dom';
import { RoutesConfig } from './routes.config';
import { Dashboard, FetchData, Form, Login } from '../containers';

export const routes: ReactNode = (
  <Layout>
    <Switch>
      <Route exact path={RoutesConfig.Login.path} component={Login} />
      <Route path={RoutesConfig.Form.path} component={Form} />
      <Route path={RoutesConfig.Dashboard.path} component={Dashboard} />
      <Route path={RoutesConfig.FetchData.pathAbsolute} component={FetchData} />
    </Switch>
  </Layout>
);

/* export const routes = withRouter(({ location }) => (
  <Layout>
    <AnimatedSwitch location={location}>
      <Route exact path={RoutesConfig.Login.path} component={Login} />
      <Route path={RoutesConfig.Form.path} component={Form} />
      <Route path={RoutesConfig.Dashboard.path} component={Dashboard} />
      <Route path={RoutesConfig.FetchData.pathAbsolute} component={FetchData} />
    </AnimatedSwitch>
  </Layout>
)); */
