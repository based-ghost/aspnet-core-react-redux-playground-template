import { BaseService } from './base.service';
import type { AxiosResponse } from 'axios';
import type { IAuthUser, ICredentials } from '../store/authSlice';

/**
 * Auth API abstraction layer communication via Axios (typescript singleton pattern)
 */
class AuthService extends BaseService {
  private static _authService: AuthService;
  private static _controller: string = 'Auth';

  private constructor(name: string) {
    super(name);
  }

  public static get Instance(): AuthService {
    return this._authService || (this._authService = new this(this._controller));
  }

  public async logoutAsync(): Promise<AxiosResponse> {
    return await this.$http.post('Logout');
  }

  public async loginAsync(credentials: ICredentials): Promise<IAuthUser> {
    const { data } = await this.$http.post<IAuthUser>('Login', credentials);
    return data;
  }
}

export const AuthApi = AuthService.Instance;
