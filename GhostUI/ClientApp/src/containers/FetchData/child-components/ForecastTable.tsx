import React from 'react';
import { isArrayWithLength } from '../../../utils';
import { IWeatherForecast } from '../../../store/weather-forecasts';

type ForecastTableProps = {
  readonly forecasts?: IWeatherForecast[];
};

const ForecastTable = React.memo<ForecastTableProps>(({ forecasts }) => (
  <table className='table is-fullwidth'>
    <thead>
      <tr>
        <th>Date</th>
        <th>Temp. (C)</th>
        <th>Temp. (F)</th>
        <th>Summary</th>
      </tr>
    </thead>
    <tbody>
      {isArrayWithLength(forecasts) &&
        forecasts.map((fc: IWeatherForecast) => (
          <tr key={fc.id}>
            <td>{fc.dateFormatted}</td>
            <td>{fc.temperatureC}</td>
            <td>{fc.temperatureF}</td>
            <td>{fc.summary}</td>
          </tr>
        ))}
    </tbody>
  </table>
));

ForecastTable.displayName = 'ForecastTable';

export default ForecastTable;
