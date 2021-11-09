import { AuthActionType, AuthStatusEnum } from './types';

import type { ReduxAction } from '../';
import type { AuthPayload, IAuthUser, IAuthState } from './types';

const initialState: IAuthState = {
  token: '',
  userName: '',
  isAuthenticated: false,
  status: AuthStatusEnum.NONE
};

export const reducer = (
  state: IAuthState = initialState,
  action: ReduxAction<AuthPayload>
): IAuthState => {
  switch (action.type) {
    case AuthActionType.SET_AUTH_STATUS: {
      const status = action?.payload?.status || AuthStatusEnum.NONE;

      return {
        ...state,
        status
      };
    }
    case AuthActionType.LOGIN_SUCCESS: {
      const authUser = (action!.payload as IAuthUser);

      return {
        ...authUser,
        isAuthenticated: true
      };
    }
    case AuthActionType.LOGOUT:
    case AuthActionType.LOGIN_FAIL:
    case AuthActionType.RESET_STATE: {
      return { ...initialState };
    }
    case AuthActionType.LOGIN:
    default:
      return state;
  }
};
