export interface IActionType {
  readonly NAMESPACE: string;
  readonly LOGIN: string;
  readonly LOGIN_SUCCESS: string;
  readonly LOGIN_FAIL: string;
  readonly LOGOUT: string;
  readonly RESET_STATE: string;
  readonly SET_AUTH_STATUS: string;
}

export const ActionType: IActionType = {
  NAMESPACE: "auth",
  LOGIN: "auth/login",
  LOGIN_SUCCESS: "auth/loginSuccess",
  LOGIN_FAIL: "auth/loginFail",
  LOGOUT: "auth/logout",
  RESET_STATE: "auth/resetState",
  SET_AUTH_STATUS: "auth/setAuthStatus"
};

export type AuthStatus = "none" | "process" | "success" | "fail";

export const AuthStatusEnum: { [key: string]: AuthStatus } = {
  NONE: "none",
  PROCESS: "process",
  SUCCESS: "success",
  FAIL: "fail"
};

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
