import React, { Fragment } from 'react';
import { SignalRApi } from '../api';
import { connect } from 'react-redux';
import { IApplicationState } from '../store';
import { toast, ToastId } from 'react-toastify';
import { boundMethod } from 'autobind-decorator';
import { Checkbox } from '../components/controls';
import { Authenticator } from '../components/loaders';
import { RoutesConfig } from '../config/routes.config';
import { RouteComponentProps } from 'react-router-dom';
import { renderToastifyMsg } from '../utils/renderToastifyMsg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actionCreators, AuthStatusEnum, ICredentials, reducer } from '../store/auth';

type LoginState = typeof initialState;
type LoginProps = ReturnType<typeof reducer> & typeof actionCreators & RouteComponentProps<{}>;

const initialState = Object.freeze({
    showPassword: false,
    invalidInputs: false,
    authRequestStatus: AuthStatusEnum.None as string,
    credentials: {
        userName: '',
        password: '',
        rememberMe: false
    } as ICredentials
});

class Login extends React.Component<LoginProps, LoginState> {
    private toastId: ToastId = '';

    constructor(props: LoginProps) {
        super(props);
        this.state = initialState;
    }

    // Configure SignalR and start connections directly before mounting this component to DOM
    public UNSAFE_componentWillMount(): void {
        SignalRApi.startConnection();
    }

    public UNSAFE_componentWillReceiveProps(nextProps: LoginProps): void {
        const nextAuthStatus = (nextProps && nextProps.status) ? nextProps.status : '';
        const curAuthStatus = (this.props && this.props.status) ? this.props.status : '';

        if (nextAuthStatus !== curAuthStatus) {
            this.setState({
                authRequestStatus: nextAuthStatus
            });
        }
    }

    public render(): React.ReactNode {
        return (
            <section className='section section-login'>
                <div className='container has-text-centered'>
                    <div className='column is-4 is-offset-4'>
                        <h3 className='title'>Login</h3>
                        <p className='subtitle'>Please login to proceed</p>
                        <div className='box'>
                            <img
                                width='180'
                                id='login-img'
                                alt='based-ghost Logo'
                                src={require('../assets/image/based-ghost-main.png')}
                            />
                            <form onSubmit={this.handleLogin}>
                                {this.renderNameInput()}
                                {this.renderPasswordInput()}
                                {this.renderLoginControls()}
                            </form>
                            <Authenticator
                                handleOnFail={this.onFailedAuth}
                                handleOnSuccess={this.onSuccessfulAuth}
                                authStatus={this.state.authRequestStatus}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    private renderNameInput(): React.ReactNode {
        const userClassName = (
            `input is-large ${(this.state.invalidInputs && !this.state.credentials.userName) ? 'is-danger' : ''}`
        ).trim();

        return (
            <div className='field'>
                <div className='control has-icons-left'>
                    <input
                        autoFocus
                        type='text'
                        placeholder='Username'
                        className={userClassName}
                        onChange={this.updateUserName}
                        value={this.state.credentials.userName}
                    />
                    <span className='icon is-left'>
                        <FontAwesomeIcon icon='user' />
                    </span>
                </div>
            </div>
        );
    }

    private renderPasswordInput(): React.ReactNode {
        const pwordClassName = (
            `input is-large ${(this.state.invalidInputs && !this.state.credentials.password) ? 'is-danger' : ''}`
        ).trim();

        return (
            <div className='field'>
                <div className='control has-icons-left has-icons-right'>
                    <input
                        placeholder='Password'
                        className={pwordClassName}
                        onChange={this.updatePassword}
                        value={this.state.credentials.password}
                        type={!this.state.showPassword ? 'password' : 'text'}
                    />
                    <span className='icon is-left'>
                        <FontAwesomeIcon icon='lock' />
                    </span>
                    <span
                        onClick={this.toggleShowPassword}
                        className='icon is-right icon-clickable'
                        data-tooltip={!this.state.showPassword ? 'Show password' : 'Hide password'}
                    >
                        <FontAwesomeIcon icon={!this.state.showPassword ? 'eye' : 'eye-slash'} />
                    </span>
                </div>
            </div>
        );
    }

    private renderLoginControls(): React.ReactNode {
        return (
            <Fragment>
                <Checkbox
                    trailingLabel='Remember me'
                    onCheck={this.updateRememberMe}
                    wrapperClass='remember-me-control'
                    checked={!!this.state.credentials.rememberMe}
                />
                <button type='submit' className='button is-info is-large is-fullwidth'>
                    <span>Login</span>
                    <span className='icon'>
                        <FontAwesomeIcon icon='sign-in-alt' />
                    </span>
                </button>
            </Fragment>
        );
    }

    private onSuccessfulAuth = (): void => {
        this.props.history.push(RoutesConfig.Dashboard.path);
    }

    private onFailedAuth = (): void => {
        this.props.resetState();
        this.setState({ authRequestStatus: AuthStatusEnum.None as string });
    }

    @boundMethod
    private handleLogin(e: React.SyntheticEvent<HTMLFormElement>): void {
        e.preventDefault();

        // Prevent multiple login requests onClick
        if (this.state.authRequestStatus === AuthStatusEnum.Process) {
            return;
        }

        if (!this.state.credentials.userName || !this.state.credentials.password) {
            // Run invalidInputs error and display toast notification (if one is not already active)
            this.setState({ invalidInputs: true });
            if (!toast.isActive(this.toastId)) {
                this.toastId = toast.error(renderToastifyMsg('Enter user name/password', 'exclamation'));
            }
        } else {
            // Clear any toast notifications and prepare state for Login request stub / run login request stub
            toast.dismiss();

            this.setState({
                invalidInputs: false,
                authRequestStatus: AuthStatusEnum.Process as string,
            });

            setTimeout(() => {
                this.props.loginUserRequest(this.state.credentials);
            }, 2500);
        }
    }

    @boundMethod
    private toggleShowPassword(): void {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    @boundMethod
    private updateRememberMe(checked: boolean): void {
        this.setState({
            credentials: {
                ...this.state.credentials,
                rememberMe: checked
            }
        });
    }

    @boundMethod
    private updateUserName(e: React.SyntheticEvent<HTMLInputElement>): void {
        this.setState({
            credentials: {
                ...this.state.credentials,
                userName: (e.currentTarget.value || '').trim()
            }
        });
    }

    @boundMethod
    private updatePassword(e: React.SyntheticEvent<HTMLInputElement>): void {
        this.setState({
            credentials: {
                ...this.state.credentials,
                password: (e.currentTarget.value || '').trim()
            }
        });
    }
}

// Wire up the React component to the Redux store
export default connect((state: IApplicationState) => state.auth, actionCreators)(Login);