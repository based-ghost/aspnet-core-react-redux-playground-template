export interface IActionType {
    REQUEST: string;
    RECIEVE: string;
    RESET_STATE: string;
}

export const ActionType: IActionType = {
    REQUEST: 'FETCH_REQUEST',
    RECIEVE: 'FETCH_RECIEVE',
    RESET_STATE: 'RESET_WEATHER_STATE'
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