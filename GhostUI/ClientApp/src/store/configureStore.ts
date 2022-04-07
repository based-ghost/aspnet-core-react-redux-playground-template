import thunk from 'redux-thunk';
import createRootReducer from './rootReducer';
import { applyMiddleware, compose, createStore, type Store } from 'redux';
import type { RootState } from './index';

const configureStore = (initialState?: RootState): Store<RootState> => {
  const composeEnhancer: typeof compose =
    (window as any)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
  );

  return store;
};

export default configureStore;