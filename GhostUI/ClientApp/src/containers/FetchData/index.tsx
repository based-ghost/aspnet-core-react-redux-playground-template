import Pagination from './Pagination';
import { Spinner } from '../../components';
import ForecastTable from './ForecastTable';
import { useParams } from 'react-router-dom';
import { useEffect, type FunctionComponent } from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import { getForecastsAsync, type WeatherForecast } from '../../store/weatherSlice';

const FetchData: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const { startDateIndex: startDateIndexDefault = '0' } = useParams();
  const intNextStartDateIndex = parseInt(startDateIndexDefault, 10);

  const isLoading = useAppSelector<boolean>((state) => state.weather.isLoading);
  const forecasts = useAppSelector<WeatherForecast[]>((state) => state.weather.forecasts);
  const startDateIndex = useAppSelector<number>((state) => state.weather.startDateIndex);

  useEffect(() => {
    if (startDateIndex !== intNextStartDateIndex) {
      dispatch(getForecastsAsync(intNextStartDateIndex));
    }
  }, [dispatch, startDateIndex, intNextStartDateIndex]);

  return (
    <div className="section">
      <div className="container">
        <h3 className="title is-3">
          Fetch Data
        </h3>
        <div className="box container-box">
          <h3 className="title is-4">
            Weather forecast
          </h3>
          <h5 className="subtitle is-5">
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
