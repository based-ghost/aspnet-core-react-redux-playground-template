export interface IActionType {
    NAMESPACE: string;
    REQUEST: string;
    RECEIVE: string;
    RESET_STATE: string;
}

export const ActionType: IActionType = {
    NAMESPACE: 'weather',
    REQUEST: 'weather/fetch',
    RECEIVE: 'weather/receive',
    RESET_STATE: 'weather/resetState'
};

export interface WeatherForecast {
    DateFormatted: string;
    TemperatureC: number;
    TemperatureF: number;
    Summary: string;
}

export interface WeatherForecastsState {
    readonly isLoading?: boolean;
    readonly startDateIndex?: number;
    readonly forecasts?: WeatherForecast[];
}

export interface WeatherForecastsAction {
    readonly type: string;
    readonly startDateIndex?: number;
    readonly forecasts?: WeatherForecast[];
}