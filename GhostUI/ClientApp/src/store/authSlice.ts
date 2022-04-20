/* eslint-disable @typescript-eslint/no-redeclare */
import { AuthApi } from 'src/api';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const AuthStatusEnum = {
  FAIL: 'fail',
  NONE: 'none',
  PROCESS: 'process',
  SUCCESS: 'success'
} as const;

export type AuthStatusEnum = typeof AuthStatusEnum[keyof typeof AuthStatusEnum];

export type Credentials = {
  userName?: string;
  password?: string;
  rememberMe?: boolean;
};

export type AuthUser = {
  token?: string;
  userName?: string;
  status: AuthStatusEnum;
};

export type AuthState = AuthUser & { isAuthenticated: boolean; };

const initialState: AuthState = {
  token: '',
  userName: '',
  isAuthenticated: false,
  status: AuthStatusEnum.NONE
};

const replaceState = (
  state: AuthState,
  { status, token, userName, isAuthenticated }: AuthState
) => {
  state.token = token;
  state.status = status;
  state.userName = userName;
  state.isAuthenticated = isAuthenticated;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<AuthStatusEnum>) => {
      state.status = action.payload;
    },
    setUserLogin: (state, action: PayloadAction<AuthState>) => {
      replaceState(state, action.payload);
    },
    resetState: (state) => {
      replaceState(state, initialState);
    }
  }
});

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (credentials: Credentials, { dispatch }) => {
    try {
      const authUser = await AuthApi.loginAsync(credentials);
      const payload = { ...authUser, isAuthenticated: true };

      dispatch(setUserLogin(payload));
    } catch (e) {
      dispatch(setAuthStatus(AuthStatusEnum.FAIL));
    }
  }
);

export const { setAuthStatus, setUserLogin, resetState } = authSlice.actions;

export default authSlice.reducer;