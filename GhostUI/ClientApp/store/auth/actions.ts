import { AuthApi } from "../../api";
import { addTask } from "domain-task";
import { CallbackFunction } from "../../types";
import { IAppThunkAction, ReduxAction } from "../";
import { ActionType, IAuthUser, ICredentials } from "./types";

const isLoginSuccess = (authUser: IAuthUser): boolean => {
  const { status } = authUser;
  return (status && status.toLowerCase().includes('success'));
};

export const actionCreators = {
  resetState: (): ReduxAction => ({
    type: ActionType.RESET_STATE
  }),
  setAuthStatus: (status: string): ReduxAction => ({
    status,
    type: ActionType.SET_AUTH_STATUS
  }),
  loginUserRequest: (credentials: ICredentials): IAppThunkAction<ReduxAction> => (dispatch, getState) => {
    const loginTask = AuthApi.loginAsync(credentials)
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

    // Ensure server-side prerendering waits for this to complete
    addTask(loginTask);
  },
  logoutUserRequest: (handleRouteCallback: CallbackFunction): IAppThunkAction<ReduxAction> => (dispatch, getState) => {
    const logoutTask = AuthApi.logoutAsync()
      .then(() => {
        handleRouteCallback();
        dispatch({ type: ActionType.RESET_STATE });
      });

    // Ensure server-side prerendering waits for this to complete
    addTask(logoutTask);
  }
};
