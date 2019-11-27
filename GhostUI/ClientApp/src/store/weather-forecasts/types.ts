export interface IActionType {
  readonly REQUEST: string;
  readonly RECEIVE: string;
  readonly RESET_STATE: string;
}

export type IWeatherForecast = {
  readonly id: number;
  readonly dateFormatted: string;
  readonly temperatureC: number;
  readonly temperatureF: number;
  readonly summary: string;
};

export type IWeatherForecastsState = {
  readonly isLoading: boolean;
  readonly startDateIndex?: number;
  readonly forecasts: IWeatherForecast[];
};

const _namespace = 'weather';

export const ActionType = Object.freeze<IActionType>({
  REQUEST: `${_namespace}/fetch`,
  RECEIVE: `${_namespace}/receive`,
  RESET_STATE: `${_namespace}/resetState`
});