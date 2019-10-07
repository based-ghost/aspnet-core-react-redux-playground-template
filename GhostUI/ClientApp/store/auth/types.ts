export interface IActionType {
    readonly NAMESPACE: string;
    readonly LOGIN: string;
    readonly LOGIN_SUCCESS: string;
    readonly LOGIN_FAIL: string;
    readonly LOGOUT: string;
    readonly RESET_STATE: string;
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

export interface ICredentials {
    userName?: string;
    password?: string;
    rememberMe?: boolean;
}

export interface IAuthUser {
    token?: string;
    status?: string;
    userName?: string;
}

export interface IAuthState {
    readonly isAuthenticated: boolean;
    readonly token?: string;
    readonly status?: string;
    readonly userName?: string;
}

export type IAuthAction = { readonly type: string; } & { [key: string]: any; };
