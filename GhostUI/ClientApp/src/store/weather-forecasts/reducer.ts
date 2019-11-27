import { actionCreators } from "./actions";
import { FunctionReturnTypes, ReduxAction } from "../";
import { ActionType, IWeatherForecastsState } from "./types";

const initialState = Object.freeze<IWeatherForecastsState>({
  forecasts: [],
  isLoading: false
});

export const reducer = (
  state: IWeatherForecastsState = initialState,
  incomingAction: FunctionReturnTypes<typeof actionCreators>
) => {
  const action = incomingAction as ReduxAction;

  switch (action.type) {
    case ActionType.REQUEST:
      const { startDateIndex } = action;
      return {
        ...state,
        startDateIndex,
        isLoading: true
      };
    case ActionType.RECEIVE:
      // Only accept the incoming data if it matches the most recent request. This ensures we correctly handle out-of-order responses.
      if (action.startDateIndex === state.startDateIndex) {
        const { forecasts, startDateIndex } = action;
        return {
          forecasts,
          startDateIndex,
          isLoading: false
        };
      }
      return state;
    default:
      return state;
  }
};
