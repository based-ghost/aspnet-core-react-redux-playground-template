import { useEffect, FunctionComponent } from 'react';
import Layout from './Layout';
import { History } from 'history';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router';
import { SignalRApi } from './api/signalR.service';
import AxiosGlobalConfig from './config/axios.config';
import { RoutesConfig } from './config/routes.config';
import { ConnectedRouter } from 'connected-react-router';
import { Dashboard, FetchData, Form, Login } from './containers';

const App: FunctionComponent<{ history: History }> = ({ history }) => {
  useEffect(() => {
    AxiosGlobalConfig.setup();
    SignalRApi.startConnection();
  }, []);

  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          <Route path={RoutesConfig.Login.path} component={Login} exact />
          <Route path={RoutesConfig.Form.path} component={Form} />
          <Route path={RoutesConfig.Dashboard.path} component={Dashboard} />
          <Route path={RoutesConfig.FetchData.pathAbsolute} component={FetchData} />
        </Switch>
      </Layout>
    </ConnectedRouter>
  );
};

export default hot(App);