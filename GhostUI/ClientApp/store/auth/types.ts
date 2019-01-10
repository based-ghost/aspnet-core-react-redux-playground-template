export interface IActionType {
    NAMESPACE: string;
    LOGIN: string;
    LOGIN_SUCCESS: string;
    LOGIN_FAIL: string;
    LOGOUT: string;
    RESET_STATE: string;
}

export const ActionType: IActionType = {
    NAMESPACE: 'auth',
    LOGIN: 'auth/login',
    LOGIN_SUCCESS: 'auth/loginSuccess',
    LOGIN_FAIL: 'auth/loginFail',
    LOGOUT: 'auth/logout',
    RESET_STATE: 'auth/resetState'
};

export const enum AuthStatusEnum {
    None = 'none',
    Process = 'process',
    Success = 'success',
    Fail = 'fail'
}

export interface Credentials {
    userName?: string;
    password?: string;
    rememberMe?: boolean;
}

export interface AuthUser {
    token?: string;
    status?: string;
    userName?: string;
}

export interface AuthState {
    readonly isAuthenticated: boolean;
    readonly token?: string;
    readonly status?: string;
    readonly userName?: string;
}

export interface AuthAction {
    readonly type: string;
    readonly authUser?: AuthUser;
    readonly checked?: boolean;
    readonly value?: string;
}
