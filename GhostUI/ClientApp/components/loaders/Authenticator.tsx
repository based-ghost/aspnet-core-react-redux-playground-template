import * as React from 'react';
import { AuthStatusEnum } from '../../store/auth/types';

type AuthenticatorProps = {
    authStatus?: string;
    callbackTimeout?: number;
    successDispatcher: Function;
    failDispatcher: Function;
};

const Authenticator: React.FC<AuthenticatorProps> = (props) => {
    React.useEffect(() => {
        if (props.authStatus && props.authStatus.isIn(AuthStatusEnum.Success, AuthStatusEnum.Fail)) {
            setTimeout(() => {
                (props.authStatus === AuthStatusEnum.Success) && props.successDispatcher();
                (props.authStatus === AuthStatusEnum.Fail) && props.failDispatcher();
            }, props.callbackTimeout || 1500);
        }
    }, [props.authStatus]);

    return (
        <div className={`atom-loader ${props.authStatus}`}>
            <div></div>
            <div></div>
        </div>
    );
};

export default Authenticator;

/**
 * ORIGINAL CLASS IMPLEMENTATION
 */

//import * as React from 'react';
//import { AuthStatusEnum } from '../../store/auth/types';

//type AuthenticatorProps = {
//    authStatus?: string;
//    callbackTimeout?: number;
//    successDispatcher: Function;
//    failDispatcher: Function;
//};

//type AuthenticatorState = typeof initialState;
//const initialState = Object.freeze({ show: false });

//export default class Authenticator extends React.PureComponent<AuthenticatorProps, AuthenticatorState> {
//    static defaultProps = {
//        callbackTimeout: 1500,
//        authStatus: AuthStatusEnum.None as string
//    };

//    constructor(props: AuthenticatorProps) {
//        super(props);
//        this.state = initialState;
//    }

//    public componentWillReceiveProps(nextProps: AuthenticatorProps): void {
//        const nextAuthStatus = nextProps.authStatus || AuthStatusEnum.None;

//        if (nextAuthStatus.isIn(AuthStatusEnum.Success, AuthStatusEnum.Fail)) {
//            this.handleAuthCallback(nextAuthStatus);
//        } else {
//            this.setState({ show: (nextAuthStatus === AuthStatusEnum.Process) });
//        }
//    }

//    public render(): React.ReactNode {
//        return (
//            <div className={`atom-loader ${this.state.show ? this.props.authStatus : 'inactive'}`}>
//                <div></div>
//                <div></div>
//            </div>
//        );
//    }

//    private handleAuthCallback(nextAuthStatus: string): void {
//        setTimeout(() => {
//            if (nextAuthStatus === AuthStatusEnum.Success) {
//                this.props.successDispatcher();
//            } else {
//                this.props.failDispatcher();
//            }
//        }, this.props.callbackTimeout);
//    }
//}