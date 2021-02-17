import { SampleApi } from '../../api';
import { ReduxAction, AppThunk } from '../';
import { WeatherActionType, IWeatherForecast, WeatherForecastPayload } from './types';

export const actionCreators = {
  resetState: (): ReduxAction<WeatherForecastPayload> => ({
    type: WeatherActionType.RESET_STATE,
  }),
  requestWeatherForecasts: (
    startDateIndex: number
  ): AppThunk<WeatherForecastPayload> => async (dispatch, getState) => {
    // If param startDateIndex === state.startDateIndex, do not perform action
    if (startDateIndex === getState().weatherForecasts.startDateIndex) {
      return;
    }

    // Dispatch request
    dispatch({
      payload: { startDateIndex },
      type: WeatherActionType.REQUEST,
    });

    // Build http request and success handler in Promise<void> wrapper
    SampleApi.getWeatherForecastsAsync(startDateIndex)
      .then((forecasts: IWeatherForecast[]) => {
        dispatch({
          type: WeatherActionType.RECEIVE,
          payload: { forecasts, startDateIndex },
        });
      });
  },
};
