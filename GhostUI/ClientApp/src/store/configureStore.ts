import thunk from 'redux-thunk';
import { IApplicationState } from './index';
import createRootReducer from './rootReducer';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore, Store } from 'redux';

export const history = createBrowserHistory();

export const configureStore = (initialState?: IApplicationState): Store<IApplicationState> => {
  const windowIfDefined: any = (typeof window === 'undefined') ? null : (window as any);
  const composeEnhancer: typeof compose = (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) || compose;

  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancer(
      applyMiddleware(
        thunk,
        routerMiddleware(history),
      ),
    ),
  )

  // Enable webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store;
};
