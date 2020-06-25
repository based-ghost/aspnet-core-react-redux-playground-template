// Types reference added to fix typescript error: Property 'hot' does not exist on type 'Module'
/// <reference types="webpack-env" />

import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './assets/style/scss/site.scss';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { history, configureStore } from './store';
import { configureAxiosInterceptors } from './config/axios.config';
import './config/fa.config';
import * as serviceWorker from './serviceWorker';

// Create browser history to use in the Redux store / Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore();

// Execute any base Axios configurations (e.g. request interceptors)
configureAxiosInterceptors();

// This function starts up the React app when it runs in a browser. It sets up the routing configuration and injects the app into a DOM element.
const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <Fragment>
        <Provider store={store}>
          <App history={history} />
        </Provider>
        <ToastContainer
          autoClose={3500}
          draggable={false}
          newestOnTop={true}
          position='top-center'
        />
      </Fragment>
    </AppContainer>,
    document.getElementById('root')
  );
};

// Execute function above to patch app to DOM
renderApp();

// Allow Hot Module Replacement
if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
