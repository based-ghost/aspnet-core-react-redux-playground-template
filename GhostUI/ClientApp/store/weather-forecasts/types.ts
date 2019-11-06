export interface IActionType {
  readonly NAMESPACE: string;
  readonly REQUEST: string;
  readonly RECEIVE: string;
  readonly RESET_STATE: string;
}

export const ActionType: IActionType = {
  NAMESPACE: "weather",
  REQUEST: "weather/fetch",
  RECEIVE: "weather/receive",
  RESET_STATE: "weather/resetState"
};

export type IWeatherForecast = {
  readonly ID: number;
  readonly DateFormatted: string;
  readonly TemperatureC: number;
  readonly TemperatureF: number;
  readonly Summary: string;
};

export type IWeatherForecastsState = {
  readonly isLoading: boolean;
  readonly startDateIndex?: number;
  readonly forecasts: IWeatherForecast[];
};
