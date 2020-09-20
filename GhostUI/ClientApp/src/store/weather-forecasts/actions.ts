import { SampleApi } from '../../api';
import { IAppThunkAction, ReduxAction } from '../';
import { WeatherActionType, IWeatherForecast } from './types';

export const actionCreators = {
  resetState: (): ReduxAction => ({
    type: WeatherActionType.RESET_STATE
  }),
  requestWeatherForecasts: (startDateIndex: number): IAppThunkAction<ReduxAction> => (dispatch, getState) => {
    // If param startDateIndex === state.startDateIndex, do not perform action
    if (startDateIndex === getState().weatherForecasts.startDateIndex) {
      return;
    }

    // Dispatch request
    dispatch({
      startDateIndex,
      type: WeatherActionType.REQUEST
    });

    // Build http request and success handler in Promise<void> wrapper
    SampleApi.getWeatherForecastsAsync(startDateIndex)
      .then((forecasts: IWeatherForecast[]) => {
        dispatch({
          forecasts,
          startDateIndex,
          type: WeatherActionType.RECEIVE
        });
      });
  },
};
