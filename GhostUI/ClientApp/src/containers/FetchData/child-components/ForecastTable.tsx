import React, { ReactNode } from "react";
import { isArrayWithLength } from "../../../utils";
import { IWeatherForecast } from "../../../store/weather-forecasts";

type ForecastTableProps = {
  readonly forecasts?: IWeatherForecast[];
};

const ForecastTable = React.memo<ForecastTableProps>(({ forecasts }) => (
  <table className="table is-fullwidth">
    <thead>
      <tr>
        <th>Date</th>
        <th>Temp. (C)</th>
        <th>Temp. (F)</th>
        <th>Summary</th>
      </tr>
    </thead>
    <tbody>
      {isArrayWithLength(forecasts)
        && forecasts.map((forecast: IWeatherForecast): ReactNode => (
          <tr key={forecast.id}>
            <td>{forecast.dateFormatted}</td>
            <td>{forecast.temperatureC}</td>
            <td>{forecast.temperatureF}</td>
            <td>{forecast.summary}</td>
          </tr>
      ))}
    </tbody>
  </table>
));

ForecastTable.displayName = 'ForecastTable';

export default ForecastTable;