// Types reference added to fix typescript error: Property 'hot' does not exist on type 'Module'
/// <reference types="webpack-env" />

import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/scss/site.scss';
import { routes } from './routes';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter } from 'connected-react-router';
import { configureStore, IApplicationState } from './store';
import { ToastContainer, ToastPosition } from 'react-toastify';
import { configureAxiosInterceptors } from './config/axios.config';
import './config/fa.config';
import * as serviceWorker from './serviceWorker';

// Execute any base Axios configurations (e.g. request interceptors)
configureAxiosInterceptors();

// Create browser history to use in the Redux store / Get the application-wide store instance, prepopulating with state from the server where available.
const history = createBrowserHistory();
const initialState = (window as any).initialReduxState as IApplicationState;
const store = configureStore(history, initialState);

// This function starts up the React app when it runs in a browser. It sets up the routing configuration and injects the app into a DOM element.
const renderApp = (): void => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history} children={routes} />
        <ToastContainer
          autoClose={3500}
          draggable={false}
          newestOnTop={true}
          position={ToastPosition.TOP_CENTER}
        />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

// Execute function above to patch app to DOM
renderApp();

// Allow Hot Module Replacement
if (module.hot) {
  module.hot.accept('./routes', () => {
    renderApp();
  });
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
