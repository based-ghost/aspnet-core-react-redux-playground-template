export type IWeatherForecast = {
  readonly id: number;
  readonly summary: string;
  readonly temperatureC: number;
  readonly temperatureF: number;
  readonly dateFormatted: string;
};

export type IWeatherForecastsState = {
  readonly isLoading: boolean;
  readonly startDateIndex?: number;
  readonly forecasts: IWeatherForecast[];
};

export enum WeatherActionType {
  REQUEST = 'weather/fetch',
  RECEIVE = 'weather/receive',
  RESET_STATE = 'weather/resetState'
};