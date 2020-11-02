import { AuthApi } from '../../api';
import { CallbackFunction } from '../../types';
import { IAppThunkAction, ReduxAction } from '../';
import { AuthActionType, IAuthUser, ICredentials, AuthStatusEnum } from './types';

export const actionCreators = {
  resetState: (): ReduxAction => ({
    type: AuthActionType.RESET_STATE
  }),
  setAuthStatus: (status: AuthStatusEnum): ReduxAction => ({
    status,
    type: AuthActionType.SET_AUTH_STATUS
  }),
  loginUserRequest: (credentials: ICredentials): IAppThunkAction<ReduxAction> => (dispatch) => {
    AuthApi.loginAsync(credentials)
      .then((authUser: IAuthUser) => {
        const dispatchBody = (authUser.status === AuthStatusEnum.SUCCESS)
          ? { authUser, type: AuthActionType.LOGIN_SUCCESS }
          : { type: AuthActionType.LOGIN_FAIL };

        dispatch(dispatchBody);
      });
  },
  logoutUserRequest: (handleRouteCallback: CallbackFunction): IAppThunkAction<ReduxAction> => (dispatch) => {
    AuthApi.logoutAsync()
      .then(() => {
        handleRouteCallback();
        dispatch({ type: AuthActionType.RESET_STATE });
      });
  },
};
