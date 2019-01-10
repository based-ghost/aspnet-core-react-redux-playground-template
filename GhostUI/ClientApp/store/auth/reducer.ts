import { FunctionReturnTypes } from '../';
import { actionCreators } from './actions';
import { ActionType, AuthAction, AuthState} from './types';

const initialState = () => {
    return {
        isAuthenticated: false,
        token: '',
        status: '',
        userName: ''
    } as AuthState;
};

export const reducer = (state: AuthState = initialState(), incomingAction: FunctionReturnTypes<typeof actionCreators>) => {
    const action = incomingAction as AuthAction;

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