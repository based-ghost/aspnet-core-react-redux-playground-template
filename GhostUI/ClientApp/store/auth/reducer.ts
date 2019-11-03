import { FunctionReturnTypes, ReduxAction } from "../";
import { actionCreators } from "./actions";
import { ActionType, IAuthState } from "./types";

const initialState = Object.freeze<IAuthState>({
  isAuthenticated: false,
  token: '',
  status: '',
  userName: ''
});

export const reducer = (
  state: IAuthState = initialState,
  incomingAction: FunctionReturnTypes<typeof actionCreators>
) => {
  const action = incomingAction as ReduxAction;

  if (!action.type.startsWith(ActionType.NAMESPACE)) {
    return state;
  }

  switch (action.type) {
    case ActionType.LOGIN:
      return state;
    case ActionType.LOGIN_SUCCESS:
      return {
        ...action.authUser,
        isAuthenticated: true
      };
    case ActionType.LOGOUT:
    case ActionType.LOGIN_FAIL:
    case ActionType.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
