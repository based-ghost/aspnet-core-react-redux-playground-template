import { FunctionReturnTypes } from '../';
import { actionCreators } from './actions';
import { ActionType, IWeatherForecastsAction, IWeatherForecastsState } from './types';

const initialState = (): IWeatherForecastsState => {
    return {
        forecasts: [],
        isLoading: false
    };
};

export const reducer = (state: IWeatherForecastsState = initialState(), incomingAction: FunctionReturnTypes<typeof actionCreators>) => {
    const action = incomingAction as IWeatherForecastsAction;

    if (!action.type.startsWith(ActionType.NAMESPACE)) {
        return state;
    }

    switch (action.type) {
        case ActionType.REQUEST:
            return {
                ...state,
                isLoading: true,
                startDateIndex: action.startDateIndex,
            };
        case ActionType.RECEIVE:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly handle out-of-order responses.
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    forecasts: action.forecasts,
                    isLoading: false
                };
            }
            return state;
        default:
            return state;
    }
};