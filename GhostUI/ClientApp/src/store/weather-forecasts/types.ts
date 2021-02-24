export enum WeatherActionType {
  REQUEST = 'weather/fetch',
  RECEIVE = 'weather/receive',
  RESET_STATE = 'weather/resetState'
};

export type IWeatherForecast = Readonly<{
  id: number;
  summary: string;
  temperatureC: number;
  temperatureF: number;
  dateFormatted: string;
}>;

export type IWeatherForecastsState = Readonly<{
  isLoading: boolean;
  startDateIndex?: number;
  forecasts: IWeatherForecast[];
}>;

export type WeatherForecastPayload = Partial<IWeatherForecastsState>;