import { combineReducers } from 'redux';
import { reducer as FormReducer } from './form';
import { reducer as AuthReducer } from './auth';
import { reducer as WeatherForecastsReducer } from './weather-forecasts';

import type { RootState } from './index';

const rootReducer = () =>
  combineReducers<RootState>({
    auth: AuthReducer,
    form: FormReducer,
    weatherForecasts: WeatherForecastsReducer
  });

export default rootReducer;