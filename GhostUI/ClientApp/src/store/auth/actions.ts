import { ReduxAction } from '../';
import { AuthActionType, AuthPayload, IAuthUser, AuthStatusEnum } from './types';

export const actionCreators = {
  resetState: (): ReduxAction => ({
    type: AuthActionType.RESET_STATE,
  }),
  setAuthStatus: (
    status: AuthStatusEnum
  ): ReduxAction<AuthPayload> => ({
    payload: { status },
    type: AuthActionType.SET_AUTH_STATUS,
  }),
  updateUserInfo: (authUser: IAuthUser): ReduxAction<AuthPayload> => {
    const success = authUser?.status === AuthStatusEnum.SUCCESS;
    const type = success ? AuthActionType.LOGIN_SUCCESS : AuthActionType.LOGIN_FAIL;
    const payload = success ? { ...authUser } : undefined;

    return {
      type,
      payload
    }
  },
};
