import 'react-hot-loader'; // Must be imported befire React and ReactDOM
import ReactDOM from 'react-dom';
import { StrictMode, Fragment } from 'react';
import { Provider } from 'react-redux';
import './assets/style/scss/site.scss';
import App from './App';
import { createBrowserHistory } from 'history';
import { ToastContainer } from 'react-toastify';
import { configureStore, RootState } from './store';
import './config/fa.config';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

// Create browser history & initial store state (if exists) to use in the redux store
const history = createBrowserHistory();
const initialState: RootState = (window as any)?.initialReduxState;
const store = configureStore(history, initialState);

ReactDOM.render(
  <Fragment>
    <StrictMode>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </StrictMode>
    <ToastContainer
      newestOnTop
      autoClose={3500}
      draggable={false}
      position='top-center'
    />
  </Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
