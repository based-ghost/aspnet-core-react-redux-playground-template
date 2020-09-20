import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import './assets/style/scss/site.scss';
import App from './App';
import { createBrowserHistory } from 'history';
import { ToastContainer } from 'react-toastify';
import { configureStore, IApplicationState } from './store';
import AxiosGlobalConfig from './config/axios.config';
import './config/fa.config';
import * as serviceWorker from './serviceWorker';

// Execute global Axios configurations (e.g. request interceptors)
AxiosGlobalConfig.setup();

// Create browser history & initial store state (if exists) to use in the redux store
const history = createBrowserHistory();
const initialState: IApplicationState = (window as any)?.initialReduxState;
const store = configureStore(history, initialState);

// This function starts up the React app when it runs in a browser. It sets up the routing configuration and injects the app into a DOM element.
const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
        <ToastContainer
          autoClose={3500}
          draggable={false}
          newestOnTop={true}
          position='top-center'
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
  module.hot.accept('./App', () => {
    renderApp();
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
