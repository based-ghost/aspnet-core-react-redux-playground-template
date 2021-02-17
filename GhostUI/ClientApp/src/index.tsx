import 'react-hot-loader'; // Must be imported befire React and ReactDOM
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './assets/style/scss/site.scss';
import App from './App';
import { createBrowserHistory } from 'history';
import { ToastContainer } from 'react-toastify';
import { configureStore, RootState } from './store';
import AxiosGlobalConfig from './config/axios.config';
import './config/fa.config';
import * as serviceWorker from './serviceWorker';

// Execute global Axios configurations (e.g. request interceptors)
AxiosGlobalConfig.setup();

// Create browser history & initial store state (if exists) to use in the redux store
const history = createBrowserHistory();
const initialState: RootState = (window as any)?.initialReduxState;
const store = configureStore(history, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
    <ToastContainer
      newestOnTop
      autoClose={3500}
      draggable={false}
      position='top-center'
    />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
