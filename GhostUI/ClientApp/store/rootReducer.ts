import * as Form from './form';
import * as Auth from './auth';
import * as Redux from 'redux';
import { History } from 'history';
import * as WeatherForecasts from './weather-forecasts';
import { connectRouter, RouterState } from 'connected-react-router';

// The top-level state object
export interface ApplicationState {
    readonly auth: ReturnType<typeof Auth.reducer>;
    readonly form: ReturnType<typeof Form.reducer>;
    readonly weatherForecasts: ReturnType<typeof WeatherForecasts.reducer>;
    readonly router: RouterState;
}

// Takes all the individual reducers and creates a single state object by combining them
export function createRootReducer(history: History): Redux.Reducer<ApplicationState> {
    return Redux.combineReducers<ApplicationState>({
        auth: Auth.reducer,
        form: Form.reducer,
        weatherForecasts: WeatherForecasts.reducer,
        router: connectRouter(history)
    });
}

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): any;
}

// Gets the underlying unique types for all actionCreator objects for which it is applied to - used in reducer to help infer dispatched action type
export type FunctionReturnTypes<T> = { [K in keyof T]: T[K] extends (...args: any[]) => any ? ReturnType<T[K]> : never }[keyof T];