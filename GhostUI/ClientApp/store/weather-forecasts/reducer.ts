import { FunctionReturnTypes } from '../';
import { actionCreators } from './actions';
import { ActionType, WeatherForecastsAction, WeatherForecastsState } from './types';

const initialState = () => {
    return {
        forecasts: [],
        isLoading: false
    } as WeatherForecastsState;
};

export const reducer = (state: WeatherForecastsState = initialState(), incomingAction: FunctionReturnTypes<typeof actionCreators>) => {
    const action = incomingAction as WeatherForecastsAction;

    // If current action is not pertinent to this reducer, skip remainder of checks
    if (!action.type.startsWith(ActionType.NAMESPACE)) {
        return state;
    }

    switch (action.type) {
        case ActionType.REQUEST:
            return {
                startDateIndex: action.startDateIndex,
                forecasts: state.forecasts,
                isLoading: true
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
            break;
        default:
            break;
    }

    return state;
};