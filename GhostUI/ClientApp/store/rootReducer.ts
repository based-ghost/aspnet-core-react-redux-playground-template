import * as Redux from 'redux';
import { History } from 'history';
import { reducer as FormReducer } from './form';
import { reducer as AuthReducer } from './auth';
import { reducer as WeatherForecastsReducer } from './weather-forecasts';
import { connectRouter, RouterState } from 'connected-react-router';

// The top-level state object
export interface IApplicationState {
  readonly router: RouterState;
  readonly auth: ReturnType<typeof AuthReducer>;
  readonly form: ReturnType<typeof FormReducer>;
  readonly weatherForecasts: ReturnType<typeof WeatherForecastsReducer>;
}

// Type for all redux actions - takes the action type and then an optional, variable amount of additional key-value pairs
export type ReduxAction = { readonly type: string; } & { [key: string]: any; };

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are correctly typed to match your store.
export interface IAppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}

// Gets the underlying unique types for all actionCreator objects for which it is applied to - used in reducer to help infer dispatched action type
export type FunctionReturnTypes<T> = { [K in keyof T]: T[K] extends (...args: any[]) => any ? ReturnType<T[K]> : never }[keyof T];

// Takes all the individual reducers and creates a single state object by combining them
export const createRootReducer = (history: History): Redux.Reducer<IApplicationState> => (
  Redux.combineReducers<IApplicationState>({
    auth: AuthReducer,
    form: FormReducer,
    weatherForecasts: WeatherForecastsReducer,
    router: connectRouter(history)
  })
);