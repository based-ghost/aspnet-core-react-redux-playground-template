import { ReduxAction } from '../';
import { AuthActionType, AuthPayload, IAuthUser, IAuthState, AuthStatusEnum } from './types';

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
      return {
        ...state,
        status: action!.payload!.status!
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
      return {
        ...initialState
      };
    }
    case AuthActionType.LOGIN:
    default:
      return state;
  }
};
