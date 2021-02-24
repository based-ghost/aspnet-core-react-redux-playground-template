import { History } from 'history';
import { RootState } from './index';
import { combineReducers } from 'redux';
import { reducer as FormReducer } from './form';
import { reducer as AuthReducer } from './auth';
import { connectRouter } from 'connected-react-router';
import { reducer as WeatherForecastsReducer } from './weather-forecasts';

const rootReducer = (history: History) => combineReducers<RootState>({
  auth: AuthReducer,
  form: FormReducer,
  router: connectRouter(history),
  weatherForecasts: WeatherForecastsReducer,
});

export default rootReducer;