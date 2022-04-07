import { useEffect, type FunctionComponent } from 'react';
import Pagination from './Pagination';
import { Spinner } from '../../components';
import ForecastTable from './ForecastTable';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, type IWeatherForecast } from '../../store/weather-forecasts';
import type { RootState } from '../../store';

const FetchData: FunctionComponent = () => {
  const dispatch = useDispatch();

  const { startDateIndex: startDateIndexDefault = '0' } = useParams();
  const intNextStartDateIndex = parseInt(startDateIndexDefault, 10);

  const isLoading = useSelector<RootState, boolean>((state) => state.weatherForecasts.isLoading);
  const forecasts = useSelector<RootState, IWeatherForecast[]>((state) => state.weatherForecasts.forecasts);
  const startDateIndex = useSelector<RootState, number>((state) => state.weatherForecasts.startDateIndex);

  useEffect(() => {
    if (startDateIndex !== intNextStartDateIndex) {
      dispatch(actionCreators.requestWeatherForecasts(intNextStartDateIndex));
    }
  }, [dispatch, startDateIndex, intNextStartDateIndex]);

  return (
    <div className='section'>
      <div className='container'>
        <h3 className='title is-3'>
          Fetch Data
        </h3>
        <div className='box container-box'>
          <h3 className='title is-4'>
            Weather forecast
          </h3>
          <h5 className='subtitle is-5'>
            This component demonstrates fetching data from the server and working with URL parameters.
          </h5>
          <Spinner isLoading={isLoading} />
          <ForecastTable forecasts={forecasts} />
          <Pagination startDateIndex={startDateIndex} />
        </div>
      </div>
    </div>
  );
};

export default FetchData;
