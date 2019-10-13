import { AuthApi } from '../../api';
import { addTask } from 'domain-task';
import { CallbackFunction } from '../../types';
import { IAppThunkAction, ReduxAction } from '../';
import { ActionType, IAuthUser, ICredentials } from './types';

export const actionCreators = {
    loginUserRequest: (credentials: ICredentials): IAppThunkAction<ReduxAction> => (dispatch, getState) => {
        const isLoginSuccess = (authUser: IAuthUser): boolean => {
            if (!authUser || !Object.keys(authUser).length) {
                return false;
            }
            return String(authUser.status).toLowerCase().includes('success');
        };

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
    logoutUserRequest: (handleRouteCallback: CallbackFunction): IAppThunkAction<ReduxAction> => (dispatch, getState) => {
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