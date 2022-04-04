import 'react-hot-loader'; // Must be imported befire React and ReactDOM
import { createRoot } from 'react-dom/client';
import { useEffect, StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/style/scss/site.scss';
import './config/fa.config';
import { toastifyProps } from './config';
import { SignalRApi } from './api/signalr.service';
import { configureStore, RootState } from './store';
import { ToastContainer } from 'react-toastify';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
const initialState: RootState = (window as any)?.initialReduxState;
const store = configureStore(initialState);

function AppRenderer(): JSX.Element {
  useEffect(() => {
    setTimeout(async () => {
      await SignalRApi.startConnection();
    }, 250);
  }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
      <ToastContainer {...toastifyProps} />
    </StrictMode>
  );
}

root.render(<AppRenderer />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
