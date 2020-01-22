import { AuthApi } from "../../api";
import { CallbackFunction } from "../../types";
import { IAppThunkAction, ReduxAction } from "../";
import { ActionType, IAuthUser, ICredentials, AuthStatusEnum, AuthStatus } from "./types";

export const actionCreators = {
  resetState: (): ReduxAction => ({
    type: ActionType.RESET_STATE
  }),
  setAuthStatus: (status: AuthStatus): ReduxAction => ({
    status,
    type: ActionType.SET_AUTH_STATUS
  }),
  loginUserRequest: (credentials: ICredentials): IAppThunkAction<ReduxAction> => (dispatch) => {
    AuthApi.loginAsync(credentials)
      .then((authUser: IAuthUser) => {
        const { status } = authUser;
        if (status === AuthStatusEnum.SUCCESS) {
          dispatch({
            authUser,
            type: ActionType.LOGIN_SUCCESS
          });
        } else {
          dispatch({ type: ActionType.LOGIN_FAIL });
        }
      });
  },
  logoutUserRequest: (handleRouteCallback: CallbackFunction): IAppThunkAction<ReduxAction> => (dispatch) => {
    AuthApi.logoutAsync()
      .then(() => {
        handleRouteCallback();
        dispatch({ type: ActionType.RESET_STATE });
      });
  }
};
