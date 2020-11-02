import { History } from 'history';
import { combineReducers } from 'redux';
import { IApplicationState } from './index';
import { reducer as FormReducer } from './form';
import { reducer as AuthReducer } from './auth';
import { connectRouter } from 'connected-react-router';
import { reducer as WeatherForecastsReducer } from './weather-forecasts';

/**
 * Takes all the individual reducers and creates a single state object by combining them.
 */
const rootReducer = (history: History) =>
  combineReducers<IApplicationState>({
    auth: AuthReducer,
    form: FormReducer,
    router: connectRouter(history),
    weatherForecasts: WeatherForecastsReducer
  });

export default rootReducer;