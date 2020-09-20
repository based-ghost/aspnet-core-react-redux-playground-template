import { FunctionReturnTypes, ReduxAction } from '../';
import { actionCreators } from './actions';
import { AuthActionType, IAuthUser, IAuthState, AuthStatusEnum } from './types';

const initialState: IAuthState = {
  token: '',
  userName: '',
  isAuthenticated: false,
  status: AuthStatusEnum.NONE
};

export const reducer = (
  state: IAuthState = initialState,
  incomingAction: FunctionReturnTypes<typeof actionCreators>
): IAuthState => {
  const action = incomingAction as ReduxAction;

  switch (action.type) {
    case AuthActionType.SET_AUTH_STATUS:
      return {
        ...state,
        status: action.status
      };
    case AuthActionType.LOGIN_SUCCESS:
      const authUser = (action.authUser as IAuthUser);
      return {
        ...authUser,
        isAuthenticated: true
      };
    case AuthActionType.LOGOUT:
    case AuthActionType.LOGIN_FAIL:
    case AuthActionType.RESET_STATE:
      return {
        ...initialState
      };
    case AuthActionType.LOGIN:
    default:
      return state;
  }
};
