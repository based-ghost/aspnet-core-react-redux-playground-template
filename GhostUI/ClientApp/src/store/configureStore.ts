import thunk from 'redux-thunk';
import { History } from 'history';
import { RootState } from './index';
import createRootReducer from './rootReducer';
import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore, Store } from 'redux';

type ComposeFn = typeof compose;

const configureStore = (
  history: History,
  initialState?: RootState
): Store<RootState> => {
  const composeEnhancer: ComposeFn = (window as any)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancer(
      applyMiddleware(thunk, routerMiddleware(history))
    )
  );

  return store;
};

export default configureStore;