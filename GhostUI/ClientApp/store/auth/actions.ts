import { AuthApi } from '../../api';
import { addTask } from 'domain-task';
import { IAppThunkAction, ReduxAction } from '../';
import { isLoginSuccess } from '../../utils/helpers';
import { ActionType, IAuthUser, ICredentials } from './types';

export const actionCreators = {
    loginUserRequest: (credentials: ICredentials): IAppThunkAction<ReduxAction> => (dispatch, getState) => {
        const loginTask = AuthApi.loginAsync(credentials)
            .then((data: IAuthUser) => {
                if (isLoginSuccess(data)) { // SUCCESS
                    dispatch({ type: ActionType.LOGIN_SUCCESS, authUser: data });
                } else { // FAIL
                    dispatch({ type: ActionType.LOGIN_FAIL });
                }
            });

        // Ensure server-side prerendering waits for this to complete
        addTask(loginTask);
    },
    logoutUserRequest: (handleRouteCallback: Function): IAppThunkAction<ReduxAction> => (dispatch, getState) => {
        const logoutTask = AuthApi.logoutAsync()
            .then(() => {
                handleRouteCallback();
                dispatch({ type: ActionType.RESET_STATE });
            });

        // Ensure server-side prerendering waits for this to complete
        addTask(logoutTask);
    },
    resetState: (): ReduxAction => ({ type: ActionType.RESET_STATE })
};