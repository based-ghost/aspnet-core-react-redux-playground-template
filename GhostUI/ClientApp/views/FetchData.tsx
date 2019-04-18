import React from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../store';
import { Spinner } from '../components/loaders';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actionCreators, IWeatherForecast, reducer } from '../store/weather-forecasts';

type WeatherForecastProps = ReturnType<typeof reducer> & typeof actionCreators & RouteComponentProps<{ startDateIndex: string }>;

class FetchData extends React.Component<WeatherForecastProps> {
    public componentDidMount(): void {
        const startDateIndex = parseInt(this.props.match.params.startDateIndex) || 0;
        this.props.requestWeatherForecasts(startDateIndex);
    }

    public componentWillReceiveProps(nextProps: WeatherForecastProps): void {
        const nextStartDateIndex = nextProps.match.params.startDateIndex;
        const curStartDateIndex = (this.props.startDateIndex || 0).toString();
        if (nextStartDateIndex !== curStartDateIndex) {
            const startDateIndex = parseInt(nextStartDateIndex) || 0;
            this.props.requestWeatherForecasts(startDateIndex);
        }
    }

    public render(): React.ReactNode {
        return (
            <section className='section'>
                <div className='container is-centered box'>
                    <h3 className='title is-3'>Weather forecast</h3>
                    <h5 className='subtitle is-5'>This component demonstrates fetching data from the server and working with URL parameters.</h5>
                    <Spinner loading={this.props.isLoading} />
                    {this.renderForecastsTable()}
                    {this.renderPagination()}
                </div>
            </section>
        );
    }

    private renderForecastsTable(): React.ReactNode {
        return (
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
                    {(this.props.forecasts || []).map((forecast: IWeatherForecast) =>
                        <tr key={forecast.ID}>
                            <td>{forecast.DateFormatted}</td>
                            <td>{forecast.TemperatureC}</td>
                            <td>{forecast.TemperatureF}</td>
                            <td>{forecast.Summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    private renderPagination(): React.ReactNode {
        return (
            <p className='buttons is-pagination-group'>
                <Link className='button is-info' to={`/fetchdata/${(this.props.startDateIndex || 0) - 5}`}>
                    <FontAwesomeIcon icon='chevron-left' />Previous
                </Link>
                <Link className='button is-info' to={`/fetchdata/${(this.props.startDateIndex || 0) + 5}`}>
                    Next<FontAwesomeIcon icon='chevron-right' />
                </Link>
            </p>
        );
    }
}

// Wire up the React component to the Redux store
export default connect((state: IApplicationState) => state.weatherForecasts, actionCreators)(FetchData);