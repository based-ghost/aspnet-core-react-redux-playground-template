import { addTask } from "domain-task";
import { SampleApi } from "../../api";
import { IAppThunkAction, ReduxAction } from "../";
import { ActionType, IWeatherForecast } from "./types";

export const actionCreators = {
  resetState: (): ReduxAction => ({
    type: ActionType.RESET_STATE
  }),
  requestWeatherForecasts: (startDateIndex: number): IAppThunkAction<ReduxAction> => (dispatch, getState) => {
    // If param startDateIndex === state.startDateIndex, do not performe action
    if (startDateIndex === getState().weatherForecasts.startDateIndex) {
      return;
    }

    // Build http request and success handler in Promise<void> wrapper
    const fetchTask = SampleApi
      .getWeatherForecastsAsync(startDateIndex)
      .then((forecasts: IWeatherForecast[]) => {
        dispatch({
          forecasts,
          startDateIndex,
          type: ActionType.RECEIVE
        });
      });

    // Ensure server-side prerendering waits for this to complete
    addTask(fetchTask);

    // Dispatch request
    dispatch({
      startDateIndex,
      type: ActionType.REQUEST
    });
  }
};
