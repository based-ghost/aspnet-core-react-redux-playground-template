import { AppThunkAction } from '../';
import { addTask } from 'domain-task';
import { SampleApi } from '../../api';
import { ActionType, WeatherForecastsAction } from './types';

export const actionCreators = {
    requestWeatherForecasts: (startDateIndex: number): AppThunkAction<WeatherForecastsAction> => (dispatch, getState) => {
        if (startDateIndex !== getState().weatherForecasts.startDateIndex) {
            // Build http request and success handler in Promise<void> wrapper
            const fetchTask = SampleApi.getWeatherForecastsAsync(startDateIndex).then(data => {
                dispatch({ type: ActionType.RECIEVE, startDateIndex: startDateIndex, forecasts: data });
            });

            // Ensure server-side prerendering waits for this to complete
            addTask(fetchTask);

            // Dispatch request
            dispatch({ type: ActionType.REQUEST, startDateIndex: startDateIndex });
        }
    },
    resetState: (): WeatherForecastsAction => ({ type: ActionType.RESET_STATE })
};