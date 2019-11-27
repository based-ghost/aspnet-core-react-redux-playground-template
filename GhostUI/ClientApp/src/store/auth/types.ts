export interface IActionType {
  readonly LOGIN: string;
  readonly LOGIN_SUCCESS: string;
  readonly LOGIN_FAIL: string;
  readonly LOGOUT: string;
  readonly RESET_STATE: string;
  readonly SET_AUTH_STATUS: string;
}

export type AuthStatus = "none" | "process" | "success" | "fail";

export type ICredentials = {
  userName?: string;
  password?: string;
  rememberMe?: boolean;
};

export type IAuthUser = {
  token?: string;
  userName?: string;
  status?: AuthStatus;
};

export type IAuthState = {
  readonly isAuthenticated: boolean;
  readonly token?: string;
  readonly userName?: string;
  readonly status?: AuthStatus;
};

const _namespace = 'auth';

export const ActionType = Object.freeze<IActionType>({
  LOGIN: `${_namespace}/login`,
  LOGIN_SUCCESS: `${_namespace}/loginSuccess`,
  LOGIN_FAIL: `${_namespace}/loginFail`,
  LOGOUT: `${_namespace}/logout`,
  RESET_STATE: `${_namespace}/resetState`,
  SET_AUTH_STATUS: `${_namespace}/setAuthStatus`
});

export const AuthStatusEnum = Object.freeze<{ [key: string]: AuthStatus }>({
  NONE: "none",
  PROCESS: "process",
  SUCCESS: "success",
  FAIL: "fail"
});