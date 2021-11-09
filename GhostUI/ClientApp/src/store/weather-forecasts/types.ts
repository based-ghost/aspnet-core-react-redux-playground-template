/* eslint-disable @typescript-eslint/no-redeclare */

export const WeatherActionType = {
  REQUEST: 'weather/fetch',
  RECEIVE: 'weather/receive',
  RESET_STATE: 'weather/resetState'
} as const;

export type WeatherActionType = typeof WeatherActionType[keyof typeof WeatherActionType];

export type IWeatherForecast = Readonly<{
  id: number;
  summary: string;
  temperatureC: number;
  temperatureF: number;
  dateFormatted: string;
}>;

export type IWeatherForecastsState = Readonly<{
  isLoading: boolean;
  startDateIndex: number;
  forecasts: IWeatherForecast[];
}>;

export type WeatherForecastPayload = Partial<IWeatherForecastsState>;