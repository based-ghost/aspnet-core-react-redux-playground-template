import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IWeatherForecastsState } from '../../store/weather-forecasts';

type PaginationProps = Pick<IWeatherForecastsState, 'startDateIndex'>;

const Pagination = memo<PaginationProps>(({ startDateIndex = 0 }) => (
  <p className='buttons pagination-group'>
    <Link
      className='button is-info'
      to={`/fetchdata/${startDateIndex - 5}`}
    >
      <FontAwesomeIcon
        size='2x'
        icon='angle-double-left'
      />
    </Link>
    <Link
      className='button is-info'
      to={`/fetchdata/${startDateIndex + 5}`}
    >
      <FontAwesomeIcon
        size='2x'
        icon='angle-double-right'
      />
    </Link>
  </p>
));

Pagination.displayName = 'Pagination';

export default Pagination;