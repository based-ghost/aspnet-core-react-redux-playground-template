import authReducer from './authSlice';
import formReducer from './formSlice';
import weatherReducer from './weatherSlice';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer,
    weather: weatherReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;