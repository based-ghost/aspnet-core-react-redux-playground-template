import { memo } from 'react';
import type { IWeatherForecastsState } from '../../store/weatherSlice';

type ForecastTableProps = Pick<IWeatherForecastsState, 'forecasts'>;

const ForecastTable = memo<ForecastTableProps>(({ forecasts }) => (
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
      {forecasts.map((x) => (
        <tr key={x.id}>
          <td>{x.dateFormatted}</td>
          <td>{x.temperatureC}</td>
          <td>{x.temperatureF}</td>
          <td>{x.summary}</td>
        </tr>
      ))}
    </tbody>
  </table>
));

ForecastTable.displayName = 'ForecastTable';

export default ForecastTable;
