import thunk from 'redux-thunk';
import { History } from 'history';
import { IApplicationState } from './index';
import createRootReducer from './rootReducer';
import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore, Store } from 'redux';

export const configureStore = (
  history: History,
  initialState?: IApplicationState
): Store<IApplicationState> => {
  const composeEnhancer: typeof compose =
    (window as any)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    compose;

  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancer(applyMiddleware(thunk, routerMiddleware(history)))
  );

  // Enable webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store;
};
