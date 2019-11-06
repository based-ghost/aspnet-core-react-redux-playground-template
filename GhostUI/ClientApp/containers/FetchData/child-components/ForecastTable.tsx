import React from "react";
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
      {isArrayWithLength(forecasts) && (
        forecasts.map((forecast: IWeatherForecast) => (
          <tr key={forecast.ID}>
            <td>{forecast.DateFormatted}</td>
            <td>{forecast.TemperatureC}</td>
            <td>{forecast.TemperatureF}</td>
            <td>{forecast.Summary}</td>
          </tr>
        )))}
    </tbody>
  </table>
));

export default ForecastTable;