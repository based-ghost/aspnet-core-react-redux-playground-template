import { combineReducers } from 'redux';
import { reducer as FormReducer } from './form';
import { reducer as AuthReducer } from './auth';
import { connectRouter } from 'connected-react-router';
import { reducer as WeatherForecastsReducer } from './weather-forecasts';

import type { History } from 'history';
import type { RootState } from './index';

const rootReducer = (history: History) =>
  combineReducers<RootState>({
    auth: AuthReducer,
    form: FormReducer,
    router: connectRouter(history),
    weatherForecasts: WeatherForecastsReducer
  });

export default rootReducer;