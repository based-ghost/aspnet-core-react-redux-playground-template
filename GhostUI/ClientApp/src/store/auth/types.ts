/* eslint-disable @typescript-eslint/no-redeclare */

export const AuthStatusEnum = {
  FAIL: 'fail',
  NONE: 'none',
  PROCESS: 'process',
  SUCCESS: 'success'
} as const;

export type AuthStatusEnum = typeof AuthStatusEnum[keyof typeof AuthStatusEnum];

export const AuthActionType = {
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',
  LOGIN_FAIL: 'auth/loginFail',
  RESET_STATE: 'auth/resetState',
  LOGIN_SUCCESS: 'auth/loginSuccess',
  SET_AUTH_STATUS: 'auth/setAuthStatus'
} as const;

export type AuthActionType = typeof AuthActionType[keyof typeof AuthActionType];

export type ICredentials = {
  userName?: string;
  password?: string;
  rememberMe?: boolean;
};

export type IAuthUser = {
  token?: string;
  userName?: string;
  status: AuthStatusEnum;
};

export type IAuthState = IAuthUser & { isAuthenticated: boolean; };

export type AuthPayload = Partial<IAuthState>;