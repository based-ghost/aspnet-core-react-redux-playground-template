import thunk from 'redux-thunk';
import { History } from 'history';
import * as RootModule from './rootReducer';
import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux';

export function configureStore(history: History, initialState?: RootModule.ApplicationState, ...middlewares: Middleware[]): Store<RootModule.ApplicationState> {
    // Build middleware. These are functions that can process the actions before they reach the store.
    const pipeline = applyMiddleware(
        thunk,
        routerMiddleware(history),
        ...middlewares
    );

    // Combine all reducers and instantiate the app-wide store instance
    const store = createStore(RootModule.createRootReducer(history), initialState, compose(pipeline));

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./rootReducer', () => {
            const { createRootReducer } = require<typeof RootModule>('./rootReducer');
            store.replaceReducer(createRootReducer(history));
        });
    }

    return store;
}