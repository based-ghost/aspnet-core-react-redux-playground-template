import './css/site.scss';
import './prototype';
import routes from './routes';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter } from 'connected-react-router';
import { ApplicationState, configureStore } from './store';
import { ToastContainer, ToastPosition } from 'react-toastify';

// Create browser history to use in the Redux store / Get the application-wide store instance, prepopulating with state from the server where available.
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
const history = createBrowserHistory({ basename: baseUrl });
const initialState = (window as any).initialReduxState as ApplicationState;
const store = configureStore(history, initialState);

// This function starts up the React app when it runs in a browser. It sets up the routing configuration and injects the app into a DOM element.
const renderApp = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history} children={routes} />
                <ToastContainer autoClose={3500} draggable={false} newestOnTop={true} position={ToastPosition.TOP_CENTER} />
            </Provider>
        </AppContainer>,
        document.getElementById('app-root')
    );
};

// Execute function above to patch app to dom
renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./routes', () => {
        renderApp();
    });
}
