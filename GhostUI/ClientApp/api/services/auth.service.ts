import { BaseService } from './base.service';
import { authService } from '../../config/constants';
import { AuthUser, Credentials } from '../../store/auth/types';

/**
 * Auth API abstraction layer communication via Axios (typescript singleton pattern)
 */
class AuthService extends BaseService {
    private static _authService: AuthService;

    public static get Instance(): AuthService {
        return this._authService || (this._authService = new this(authService.CONTROLLER_ID));
    }

    private constructor(controllerName: string) {
        super(controllerName);
    }

    public async logoutAsync(): Promise<any> {
        const { data } = await this.$http.post(authService.LOGOUT_RQ);
        return data;
    }

    public async loginAsync(credentials: Credentials): Promise<AuthUser> {
        const { data } = await this.$http.post(authService.LOGIN_RQ, credentials);
        return <AuthUser> data;
    }
}

export const AuthApi = AuthService.Instance;