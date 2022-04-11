import { AuthApi } from '../../api';
import type { AppThunk, ReduxAction } from '../';
import { AuthActionType, type AuthPayload, type ICredentials, type AuthStatusEnum } from './types';

export const actionCreators = {
  resetState: (): ReduxAction => ({
    type: AuthActionType.RESET_STATE,
  }),
  setAuthStatus: (status: AuthStatusEnum): ReduxAction<AuthPayload> => ({
    payload: { status },
    type: AuthActionType.SET_AUTH_STATUS,
  }),
  login:
    (credentials: ICredentials): AppThunk<AuthPayload> =>
    async (dispatch) => {
      try {
        const authUser = await AuthApi.loginAsync(credentials);
        const success = authUser?.status === "success";
        const payload = success ? authUser : undefined;

        dispatch({
          payload,
          type: success ? AuthActionType.LOGIN_SUCCESS : AuthActionType.LOGIN_FAIL,
        });
      } catch (e) {
        dispatch({
          type: AuthActionType.LOGIN_FAIL,
        });
      }
    },
};
