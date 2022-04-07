import { BaseService } from './base.service';
import type { IWeatherForecast } from '../store/weather-forecasts';

/**
 * SampleData API abstraction layer communication via Axios (typescript singleton pattern)
 */
class SampleService extends BaseService {
  private static _sampleService: SampleService;
  private static _controller: string = 'SampleData';

  private constructor(name: string) {
    super(name);
  }

  public static get Instance(): SampleService {
    return this._sampleService || (this._sampleService = new this(this._controller));
  }

  public async getWeatherForecastsAsync(startDateIndex: number): Promise<IWeatherForecast[]> {
    const url = `WeatherForecasts?startDateIndex=${startDateIndex}`;
    const { data } = await this.$http.get<IWeatherForecast[]>(url);

    return data;
  }
}

export const SampleApi = SampleService.Instance;
