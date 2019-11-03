import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Pagination } from "./Pagination";
import { Spinner } from "../../components";
import { isNullOrUndefined } from "../../utils";
import { ForecastTable } from "./ForecastTable";
import { IApplicationState } from "../../store";
import { RouteComponentProps } from "react-router-dom";
import { actionCreators, reducer } from "../../store/weather-forecasts";

const _fetchDataTitle = 'Weather forecast';
const _fetchDataSubTitle = 'This component demonstrates fetching data from the server and working with URL parameters.';

type WeatherForecastProps = ReturnType<typeof reducer> & typeof actionCreators & RouteComponentProps<{ readonly startDateIndex: string }>;

const FetchData: React.FC<WeatherForecastProps> = ({
  isLoading,
  forecasts,
  startDateIndex,
  requestWeatherForecasts,
  match: {
    params: {
      startDateIndex: nextStartDateIndex
    }
  },
}) => {
  useEffect(() => {
    const intStartDateIndex = startDateIndex || 0;
    const intNextStartDateIndex = parseInt(nextStartDateIndex || '0', 10);

    if (isNullOrUndefined(nextStartDateIndex) || (intStartDateIndex !== intNextStartDateIndex)) {
      requestWeatherForecasts(intNextStartDateIndex);
    }
  }, [startDateIndex, nextStartDateIndex, requestWeatherForecasts]);

  return (
    <section className="section">
      <div className="container is-centered box">
        <h3 className="title is-3">{_fetchDataTitle}</h3>
        <h5 className="subtitle is-5">{_fetchDataSubTitle}</h5>
        <Spinner isLoading={isLoading} />
        <ForecastTable forecasts={forecasts} />
        <Pagination startDateIndex={startDateIndex} />
      </div>
    </section>
  );
};

// Map only necessary IApplicationState to FetchData props
const mapStateToProps = (state: IApplicationState) => state.weatherForecasts;

// Wire up the React component to the Redux store
export default connect(mapStateToProps, actionCreators)(FetchData);
