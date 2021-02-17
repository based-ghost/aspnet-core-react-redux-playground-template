import { ReduxAction } from '../';
import { WeatherActionType, WeatherForecastPayload, IWeatherForecastsState } from './types';

const initialState: IWeatherForecastsState = {
  forecasts: [],
  isLoading: false
};

export const reducer = (
  state: IWeatherForecastsState = initialState,
  action: ReduxAction<WeatherForecastPayload>
): IWeatherForecastsState => {
  switch (action.type) {
    case WeatherActionType.REQUEST: {
      const { startDateIndex } = action.payload as WeatherForecastPayload;

      return {
        ...state,
        startDateIndex,
        isLoading: true
      };
    }
    case WeatherActionType.RECEIVE: {
      const {
        startDateIndex,
        forecasts = []
      } = action.payload as WeatherForecastPayload;

      // Only accept the incoming data if it matches the most recent request. This ensures we correctly handle out-of-order responses.
      if (startDateIndex === state.startDateIndex) {
        return {
          forecasts,
          startDateIndex,
          isLoading: false
        };
      }

      return state;
    }
    default:
      return state;
  }
};
