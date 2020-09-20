export type ICredentials = {
  userName?: string;
  password?: string;
  rememberMe?: boolean;
};

export enum AuthStatusEnum {
  FAIL = 'fail',
  NONE = 'none',
  PROCESS = 'process',
  SUCCESS = 'success'
};

export type IAuthUser = {
  token?: string;
  userName?: string;
  status?: AuthStatusEnum;
};

export enum AuthActionType {
  LOGIN = 'auth/login',
  LOGOUT = 'auth/logout',
  LOGIN_FAIL = 'auth/loginFail',
  RESET_STATE = 'auth/resetState',
  LOGIN_SUCCESS = 'auth/loginSuccess',
  SET_AUTH_STATUS = 'auth/setAuthStatus'
};

export type IAuthState = IAuthUser & { isAuthenticated: boolean; };