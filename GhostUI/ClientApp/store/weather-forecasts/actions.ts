import { IAppThunkAction } from '../';
import { addTask } from 'domain-task';
import { SampleApi } from '../../api';
import { ActionType, IWeatherForecast, IWeatherForecastsAction } from './types';

export const actionCreators = {
    requestWeatherForecasts: (startDateIndex: number): IAppThunkAction<IWeatherForecastsAction> => (dispatch, getState) => {
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
    resetState: (): IWeatherForecastsAction => ({ type: ActionType.RESET_STATE })
};