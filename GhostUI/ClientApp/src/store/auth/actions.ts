import { AuthApi } from '../../api';
import { AppThunk, ReduxAction } from '../';
import { AuthActionType, AuthPayload, ICredentials, AuthStatusEnum } from './types';

export const actionCreators = {
  resetState: (): ReduxAction => ({
    type: AuthActionType.RESET_STATE,
  }),
  setAuthStatus: (status: AuthStatusEnum): ReduxAction<AuthPayload> => ({
    payload: { status },
    type: AuthActionType.SET_AUTH_STATUS,
  }),
  login: (credentials: ICredentials): AppThunk<AuthPayload> => async (dispatch) => {
    try {
      const authUser = await AuthApi.loginAsync(credentials);
      const success = authUser?.status === 'success';
      const payload = success ? authUser : undefined;
      const type = success ? AuthActionType.LOGIN_SUCCESS : AuthActionType.LOGIN_FAIL;

      dispatch({ type, payload });
    } catch (e) {
      dispatch({ type: AuthActionType.LOGIN_FAIL });
    }
  },
};
