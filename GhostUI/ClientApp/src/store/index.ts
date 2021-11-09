import { reducer as FormReducer } from './form';
import { reducer as AuthReducer } from './auth';
import { reducer as WeatherForecastsReducer } from './weather-forecasts';

import type { Action } from 'redux';
import type { ThunkAction } from 'redux-thunk';

export { default as createRootReducer } from './rootReducer';
export { default as configureStore } from './configureStore';

// The top-level state object
export type RootState = Readonly<{
  auth: ReturnType<typeof AuthReducer>;
  form: ReturnType<typeof FormReducer>;
  weatherForecasts: ReturnType<typeof WeatherForecastsReducer>;
}>;

// Type for all redux actions - takes the action type and then an optional, variable amount of additional key-value pairs
export interface ReduxAction<T = undefined> extends Action<string> {
  payload?: T;
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are correctly typed to match your store.
export type AppThunk<T = undefined> = ThunkAction<
  void,
  RootState,
  unknown,
  ReduxAction<T>
>;