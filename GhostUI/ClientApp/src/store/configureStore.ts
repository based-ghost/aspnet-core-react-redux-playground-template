import authReducer from './authSlice';
import formReducer from './formSlice';
import weatherReducer from './weatherSlice';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer,
    weather: weatherReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {auth: IAuthState, form: IFormState, weather: IWeatherState}
export type AppDispatch = typeof store.dispatch;