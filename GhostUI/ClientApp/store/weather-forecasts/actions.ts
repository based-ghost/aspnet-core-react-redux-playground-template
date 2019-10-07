import { addTask } from 'domain-task';
import { SampleApi } from '../../api';
import { IAppThunkAction, ReduxAction } from '../';
import { ActionType, IWeatherForecast } from './types';

export const actionCreators = {
    requestWeatherForecasts: (startDateIndex: number): IAppThunkAction<ReduxAction> => (dispatch, getState) => {
        if (startDateIndex !== getState().weatherForecasts.startDateIndex) {
            // Build http request and success handler in Promise<void> wrapper
            const fetchTask = SampleApi.getWeatherForecastsAsync(startDateIndex)
                .then((data: IWeatherForecast[]) => {
                    dispatch({
                        type: ActionType.RECEIVE,
                        startDateIndex: startDateIndex,
                        forecasts: data
                    });
                });

            // Ensure server-side prerendering waits for this to complete
            addTask(fetchTask);

            // Dispatch request
            dispatch({
                type: ActionType.REQUEST,
                startDateIndex: startDateIndex
            });
        }
    },
    resetState: (): ReduxAction => ({ type: ActionType.RESET_STATE })
};