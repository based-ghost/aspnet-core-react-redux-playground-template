import { FunctionReturnTypes } from '../';
import { actionCreators } from './actions';
import { ActionType, IAuthAction, IAuthState} from './types';

const initialState = () => {
    return {
        isAuthenticated: false,
        token: '',
        status: '',
        userName: ''
    } as IAuthState;
};

export const reducer = (state: IAuthState = initialState(), incomingAction: FunctionReturnTypes<typeof actionCreators>) => {
    const action = incomingAction as IAuthAction;

    // If current action is not pertinent to this reducer, skip remainder of checks
    if (!action.type.startsWith(ActionType.NAMESPACE)) {
        return state;
    }

    switch (action.type) {
        case ActionType.LOGIN:
            return state;
        case ActionType.LOGIN_SUCCESS:
            return {
                isAuthenticated: true,
                token: action.authUser!.token,
                status: action.authUser!.status,
                userName: action.authUser!.userName
            };
        case ActionType.LOGOUT:
        case ActionType.LOGIN_FAIL:
        case ActionType.RESET_STATE:
            return initialState();
        default:
            return state;
    }
};