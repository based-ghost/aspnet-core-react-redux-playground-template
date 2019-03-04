import thunk from 'redux-thunk';
import { History } from 'history';
import * as RootModule from './rootReducer';
import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore, GenericStoreEnhancer, Store, StoreEnhancerStoreCreator } from 'redux';

export function configureStore(history: History, initialState?: RootModule.IApplicationState): Store<RootModule.IApplicationState> {
    // If devTools is installed, connect to it
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    const devToolsExtension = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__ as () => GenericStoreEnhancer;

    // Build middleware. These are functions that can process the actions before they reach the store.
    const createStoreWithMiddleware = compose<StoreEnhancerStoreCreator<any>>(
        applyMiddleware(thunk, routerMiddleware(history)),
        devToolsExtension ? devToolsExtension() : <S>(next: StoreEnhancerStoreCreator<S>) => next
    )(createStore);

    // Combine all reducers and instantiate the app-wide store instance
    const store = createStoreWithMiddleware(RootModule.createRootReducer(history), initialState) as Store<RootModule.IApplicationState>;

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./rootReducer', () => {
            const { createRootReducer } = require<typeof RootModule>('./rootReducer');
            store.replaceReducer(createRootReducer(history));
        });
    }

    return store;
}