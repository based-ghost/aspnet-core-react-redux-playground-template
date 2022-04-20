import { SampleApi } from 'src/api';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type WeatherForecast = Readonly<{
  id: number;
  summary: string;
  temperatureC: number;
  temperatureF: number;
  dateFormatted: string;
}>;

export type WeatherState = Readonly<{
  isLoading: boolean;
  startDateIndex: number;
  forecasts: WeatherForecast[];
}>;

export type ReceiveForecastsPayload = Pick<WeatherState, "forecasts" | "startDateIndex">;

const initialState: WeatherState = {
  forecasts: [],
  isLoading: false,
  startDateIndex: 5
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    requestForecasts: (state, action: PayloadAction<number>) => {
      state.isLoading = true;
      state.startDateIndex = action.payload;
    },
    receiveForecasts: (state, action: PayloadAction<ReceiveForecastsPayload>) => {
      const { forecasts, startDateIndex } = action.payload;

      // Only accept the incoming data if it matches the most recent request. This ensures we correctly handle out-of-order responses.
      if (startDateIndex === state.startDateIndex) {
        state.isLoading = false;
        state.forecasts = forecasts;
        state.startDateIndex = startDateIndex;
      }
    }
  }
});

export const getForecastsAsync = createAsyncThunk(
  'weather/getForecastsAsync',
  async (startDateIndex: number, { dispatch, getState }) => {
    // If param startDateIndex === state.startDateIndex, do not perform action
    const { startDateIndex: stateIdx } = (getState as () => WeatherState)();
    if (startDateIndex === stateIdx) {
      return;
    }

    // Dispatch request to intialize loading phase
    dispatch(requestForecasts(startDateIndex));

    // Build http request and success handler in Promise<void> wrapper / complete processing
    try {
      const forecasts = await SampleApi.getForecastsAsync(startDateIndex);
      const payload = { forecasts, startDateIndex };

      dispatch(receiveForecasts(payload));
    } catch (e) {
      console.error(e);
    }
  }
);

export const { requestForecasts, receiveForecasts } = weatherSlice.actions;

export default weatherSlice.reducer;