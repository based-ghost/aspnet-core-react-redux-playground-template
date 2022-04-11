import type { ReduxAction } from '../';
import { AuthActionType, AuthStatusEnum, type AuthPayload, type IAuthUser, type IAuthState } from './types';

const INIT_STATE: IAuthState = {
  token: '',
  userName: '',
  isAuthenticated: false,
  status: AuthStatusEnum.NONE
};

export const reducer = (
  state: IAuthState = INIT_STATE,
  action: ReduxAction<AuthPayload>
): IAuthState => {
  switch (action.type) {
    case AuthActionType.SET_AUTH_STATUS: {
      const status = action.payload?.status || INIT_STATE.status;

      return {
        ...state,
        status
      };
    }
    case AuthActionType.LOGIN_SUCCESS: {
      const authUser = action.payload as IAuthUser;

      return {
        ...authUser,
        isAuthenticated: true
      };
    }
    case AuthActionType.LOGOUT:
    case AuthActionType.LOGIN_FAIL:
    case AuthActionType.RESET_STATE: {
      return { ...INIT_STATE };
    }
    case AuthActionType.LOGIN:
    default:
      return state;
  }
};
