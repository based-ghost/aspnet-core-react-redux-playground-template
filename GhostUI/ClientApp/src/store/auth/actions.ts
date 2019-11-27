import { AuthApi } from "../../api";
import { CallbackFunction } from "../../types";
import { IAppThunkAction, ReduxAction } from "../";
import { ActionType, IAuthUser, ICredentials, AuthStatusEnum, AuthStatus } from "./types";

const isLoginSuccess = (authUser: IAuthUser): boolean => {
  const { status } = authUser;
  return (status === AuthStatusEnum.SUCCESS);
};

export const actionCreators = {
  resetState: (): ReduxAction => ({
    type: ActionType.RESET_STATE
  }),
  setAuthStatus: (status: AuthStatus): ReduxAction => ({
    status,
    type: ActionType.SET_AUTH_STATUS
  }),
  loginUserRequest: (credentials: ICredentials): IAppThunkAction<ReduxAction> => (dispatch, getState) => {
    AuthApi.loginAsync(credentials)
      .then((authUser: IAuthUser) => {
        if (isLoginSuccess(authUser)) {
          dispatch({
            authUser,
            type: ActionType.LOGIN_SUCCESS
          });
        } else {
          dispatch({ type: ActionType.LOGIN_FAIL });
        }
      });
  },
  logoutUserRequest: (handleRouteCallback: CallbackFunction): IAppThunkAction<ReduxAction> => (dispatch, getState) => {
    AuthApi.logoutAsync()
      .then(() => {
        handleRouteCallback();
        dispatch({ type: ActionType.RESET_STATE });
      });
  }
};
