import { useEffect } from 'react';
import Pagination from './Pagination';
import { Spinner } from '../../components';
import ForecastTable from './ForecastTable';
import { isNullOrUndefined } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../store/weather-forecasts';

import type { RootState } from '../../store';
import type { FunctionComponent } from 'react';
import type { RouteComponentProps } from 'react-router-dom';
import type { IWeatherForecast } from '../../store/weather-forecasts';

type FetchDataProps = RouteComponentProps<{ startDateIndex: string }>;

const FetchData: FunctionComponent<FetchDataProps> = ({ match }) => {
  const dispatch = useDispatch();
  const nextStartDateIndex = match?.params?.startDateIndex;

  const isLoading = useSelector<RootState, boolean>((state) => state.weatherForecasts.isLoading);
  const forecasts = useSelector<RootState, IWeatherForecast[]>((state) => state.weatherForecasts.forecasts);
  const startDateIndex = useSelector<RootState, number | undefined>((state) => state.weatherForecasts.startDateIndex);

  useEffect(() => {
    const startDateIndexOrZero = startDateIndex || 0;
    const intNextStartDateIndex = parseInt(nextStartDateIndex || '0', 10);

    if (
      isNullOrUndefined(nextStartDateIndex) ||
      (startDateIndexOrZero !== intNextStartDateIndex)
    ) {
      dispatch(actionCreators.requestWeatherForecasts(intNextStartDateIndex));
    }
  }, [dispatch, startDateIndex, nextStartDateIndex]);

  return (
    <section className='section'>
      <div className='container'>
        <h3 className='title is-3'>Fetch Data</h3>
        <div className='box container-box'>
          <h3 className='title is-4'>Weather forecast</h3>
          <h5 className='subtitle is-5'>This component demonstrates fetching data from the server and working with URL parameters.</h5>
          <Spinner isLoading={isLoading} />
          <ForecastTable forecasts={forecasts} />
          <Pagination startDateIndex={startDateIndex} />
        </div>
      </div>
    </section>
  );
};

export default FetchData;
