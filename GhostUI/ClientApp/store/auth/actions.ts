import { IAppThunkAction } from '../';
import { AuthApi } from '../../api';
import { addTask } from 'domain-task';
import { isLoginSuccess } from '../../utils/helpers';
import { ActionType, IAuthAction, IAuthUser, ICredentials } from './types';

export const actionCreators = {
    loginUserRequest: (credentials: ICredentials): IAppThunkAction<IAuthAction> => (dispatch, getState) => {
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
    logoutUserRequest: (handleRouteCallback: Function): IAppThunkAction<IAuthAction> => (dispatch, getState) => {
        const logoutTask = AuthApi.logoutAsync()
            .then(() => {
                handleRouteCallback();
                dispatch({ type: ActionType.RESET_STATE });
            });

        // Ensure server-side prerendering waits for this to complete
        addTask(logoutTask);
    },
    resetState: (): IAuthAction => ({ type: ActionType.RESET_STATE })
};