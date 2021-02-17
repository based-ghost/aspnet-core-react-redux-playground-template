import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IWeatherForecastsState } from '../../store/weather-forecasts';

type PaginationProps = Pick<IWeatherForecastsState, 'startDateIndex'>;

const Pagination = memo<PaginationProps>(({ startDateIndex = 0 }) => (
  <p className='buttons pagination-group'>
    <Link
      className='button is-info'
      to={`/fetchdata/${startDateIndex - 5}`}
    >
      <FontAwesomeIcon icon='angle-double-left' size='2x' />
    </Link>
    <Link
      className='button is-info'
      to={`/fetchdata/${startDateIndex + 5}`}
    >
      <FontAwesomeIcon icon='angle-double-right' size='2x' />
    </Link>
  </p>
));

Pagination.displayName = 'Pagination';

export default Pagination;