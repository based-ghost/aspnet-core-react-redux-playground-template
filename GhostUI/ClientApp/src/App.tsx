import React, { useEffect } from 'react';
import Layout from './Layout';
import { History } from 'history';
import { Route, Switch } from 'react-router';
import { SignalRApi } from './api/signalR.service';
import { RoutesConfig } from './config/routes.config';
import { ConnectedRouter } from 'connected-react-router';
import { Dashboard, FetchData, Form, Login } from './containers';

const App: React.FC<{ history: History }> = ({ history }) => {
  useEffect(() => {
    SignalRApi.startConnection();
  }, []);

  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          <Route exact path={RoutesConfig.Login.path} component={Login} />
          <Route path={RoutesConfig.Form.path} component={Form} />
          <Route path={RoutesConfig.Dashboard.path} component={Dashboard} />
          <Route path={RoutesConfig.FetchData.pathAbsolute} component={FetchData} />
        </Switch>
      </Layout>
    </ConnectedRouter>
  );
};

export default App;