import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IWeatherForecastsState } from '../../store/weather-forecasts';

type PaginationProps = Pick<IWeatherForecastsState, 'startDateIndex'>;

const Pagination = memo<PaginationProps>(({ startDateIndex = 0 }) => (
  <p className='buttons pagination-group'>
    <Link
      className='button is-info'
      to={`/fetch/${startDateIndex - 5}`}
    >
      <FontAwesomeIcon icon='angle-double-left' />
    </Link>
    <Link
      className='button is-info'
      to={`/fetch/${startDateIndex + 5}`}
    >
      <FontAwesomeIcon icon='angle-double-right' />
    </Link>
  </p>
));

Pagination.displayName = 'Pagination';

export default Pagination;