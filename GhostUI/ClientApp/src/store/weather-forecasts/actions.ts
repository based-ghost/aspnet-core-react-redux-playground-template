import { SampleApi } from "../../api";
import { IAppThunkAction, ReduxAction } from "../";
import { ActionType, IWeatherForecast } from "./types";

export const actionCreators = {
  resetState: (): ReduxAction => ({
    type: ActionType.RESET_STATE
  }),
  requestWeatherForecasts: (startDateIndex: number): IAppThunkAction<ReduxAction> => (dispatch, getState) => {
    // If param startDateIndex === state.startDateIndex, do not performe action
    const startDateIndexState = getState().weatherForecasts.startDateIndex;
    if (startDateIndex === startDateIndexState) {
      return;
    }

    // Dispatch request
    dispatch({
      startDateIndex,
      type: ActionType.REQUEST
    });

    // Build http request and success handler in Promise<void> wrapper
    SampleApi.getWeatherForecastsAsync(startDateIndex)
      .then((forecasts: IWeatherForecast[]) => {
        dispatch({
          forecasts,
          startDateIndex,
          type: ActionType.RECEIVE
        });
      });
  }
};
