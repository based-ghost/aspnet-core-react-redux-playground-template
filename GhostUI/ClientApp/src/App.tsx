import { useEffect, FunctionComponent } from 'react';
import Layout from './Layout';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router';
import { SignalRApi } from './api/signalr.service';
import { ConnectedRouter } from 'connected-react-router';
import { AxiosGlobalConfig, RoutesConfig } from './config';
import { Dashboard, FetchData, Form, Login } from './containers';

import type { History } from 'history';

const App: FunctionComponent<{ history: History }> = ({ history }) => {
  useEffect(() => {
    const bootstrapApp = async () => {
      AxiosGlobalConfig.setup();
      await SignalRApi.startConnection();
    };

    bootstrapApp();
  }, []);

  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          <Route
            path={RoutesConfig.Login.path}
            exact={RoutesConfig.Login.exact}
            component={Login}
          />
          <Route
            path={RoutesConfig.Form.path}
            exact={RoutesConfig.Form.exact}
            component={Form}
          />
          <Route
            path={RoutesConfig.Dashboard.path}
            exact={RoutesConfig.Dashboard.exact}
            component={Dashboard}
          />
          <Route
            path={RoutesConfig.FetchData.pathAbsolute}
            exact={RoutesConfig.FetchData.exact}
            component={FetchData}
          />
        </Switch>
      </Layout>
    </ConnectedRouter>
  );
};

export default hot(App);